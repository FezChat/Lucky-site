const { 
    frediId,
    removeFile,
    generateRandomCode
} = require('../fredi');
const zlib = require('zlib');
const express = require('express');
const fs = require('fs');
const path = require('path');
let router = express.Router();
const pino = require("pino");
const {
    default: frediConnect,
    useMultiFileAuthState,
    delay,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

const sessionDir = path.join(__dirname, "session");

router.get('/', async (req, res) => {
    const id = frediId();
    let num = req.query.number;
    let responseSent = false;
    let sessionCleanedUp = false;

    async function cleanUpSession() {
        if (!sessionCleanedUp) {
            try {
                await removeFile(path.join(sessionDir, id));
            } catch (cleanupError) {
                console.error("Cleanup error:", cleanupError);
            }
            sessionCleanedUp = true;
        }
    }

    async function FREDI_PAIR_CODE() {
        const { version } = await fetchLatestBaileysVersion();
        console.log(version);

        const { state, saveCreds } = await useMultiFileAuthState(path.join(sessionDir, id));

        try {
            let Fredi = frediConnect({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
                syncFullHistory: false,
                generateHighQualityLinkPreview: true,
                shouldIgnoreJid: jid => !!jid?.endsWith('@g.us'),
                getMessage: async () => undefined,
                markOnlineOnConnect: true,
                connectTimeoutMs: 60000, 
                keepAliveIntervalMs: 30000
            });

            // Only request pair code if not already registered
            if (!Fredi.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, ''); // Clean up the phone number

                const randomCode = generateRandomCode();
                const code = await Fredi.requestPairingCode(num, randomCode);

                if (!responseSent && !res.headersSent) {
                    res.json({ code: code });
                    responseSent = true;
                }
            }

            Fredi.ev.on('creds.update', saveCreds);

            Fredi.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await Fredi.groupAcceptInvite("KERPI5K0w0L9rzU00QSw40"); // Join group

                    await delay(50000); // Wait for session to be ready

                    let sessionData = null;
                    let attempts = 0;
                    const maxAttempts = 15;

                    // Check if session data exists
                    while (attempts < maxAttempts && !sessionData) {
                        try {
                            const credsPath = path.join(sessionDir, id, "creds.json");
                            if (fs.existsSync(credsPath)) {
                                const data = fs.readFileSync(credsPath);
                                if (data && data.length > 100) {
                                    sessionData = data;
                                    break;
                                }
                            }
                            await delay(8000);
                            attempts++;
                        } catch (readError) {
                            console.error("Read error:", readError);
                            await delay(2000);
                            attempts++;
                        }
                    }

                    // If session data isn't found, clean up and exit
                    if (!sessionData) {
                        await cleanUpSession();
                        return;
                    }

                    try {
                        let compressedData = zlib.gzipSync(sessionData);
                        let b64data = compressedData.toString('base64');
                        await delay(5000); 

                        let sessionSent = false;
                        let sendAttempts = 0;
                        const maxSendAttempts = 5;

                        // Attempt to send session data
                        while (sendAttempts < maxSendAttempts && !sessionSent) {
                            try {
                                await Fredi.sendMessage(Fredi.user.id, {
                                    text: 'FREDI-BOTS>>=>' + b64data
                                });
                                sessionSent = true;
                            } catch (sendError) {
                                console.error("Send error:", sendError);
                                sendAttempts++;
                                if (sendAttempts < maxSendAttempts) {
                                    await delay(3000); // Wait before retrying
                                }
                            }
                        }

                        if (!sessionSent) {
                            await cleanUpSession();
                            return;
                        }

                        await delay(3000);
                        await Fredi.ws.close(); // Close the connection

                    } catch (sessionError) {
                        console.error("Session processing error:", sessionError);
                    } finally {
                        await cleanUpSession(); // Clean up after session handling
                    }
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    console.log("Reconnecting...");
                    await delay(5000); // Wait before retrying
                    FREDI_PAIR_CODE(); // Retry pairing
                }
            });

        } catch (err) {
            console.error("Main error:", err);

            // Send failure response if the pairing process fails
            if (!responseSent && !res.headersSent) {
                res.status(500).json({ code: "Service is Currently Unavailable" });
                responseSent = true;
            }
            await cleanUpSession(); // Ensure cleanup on error
        }
    }

    // Start the pairing process
    try {
        await FREDI_PAIR_CODE();
    } catch (finalError) {
        console.error("Final error:", finalError);
        await cleanUpSession();
        if (!responseSent && !res.headersSent) {
            res.status(500).json({ code: "Service Error" });
        }
    }
});

module.exports = router;
