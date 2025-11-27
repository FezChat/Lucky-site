const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Fredi_Ezra,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    // Validate phone number
    if (!num) {
        return res.status(400).send({ error: 'Phone number is required' });
    }

    async function LUCKY_MD_XFORCE_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        let Pair_Code_By_Fredi_Ezra = null;
        
        try {
            Pair_Code_By_Fredi_Ezra = Fredi_Ezra({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('safari')
            });

            if (!Pair_Code_By_Fredi_Ezra.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Fredi_Ezra.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Fredi_Ezra.ev.on('creds.update', saveCreds);
            
            Pair_Code_By_Fredi_Ezra.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect, qr } = s;
                console.log('Connection update:', connection);
                
                if (connection === 'open') {
                    console.log('Connection opened successfully');
                    
                    // Wait longer for connection to stabilize
                    await delay(10000);
                    
                    try {
                        // Verify connection is still open
                        if (Pair_Code_By_Fredi_Ezra.user && Pair_Code_By_Fredi_Ezra.user.id) {
                            // Read and send session data
                            const credsPath = __dirname + `/temp/${id}/creds.json`;
                            if (fs.existsSync(credsPath)) {
                                let data = fs.readFileSync(credsPath);
                                let b64data = Buffer.from(data).toString('base64');
                                
                                console.log('Sending session data...');
                                
                                // Send session data first
                                let session = await Pair_Code_By_Fredi_Ezra.sendMessage(
                                    Pair_Code_By_Fredi_Ezra.user.id, 
                                    { text: 'LUCKY-XFORCE••<=>' + b64data }
                                ).catch(err => {
                                    console.error('Error sending session data:', err);
                                    return null;
                                });

                                if (session) {
                                    console.log('Session data sent successfully');
                                    
                                    // Wait a bit before sending welcome message
                                    await delay(2000);
                                    
                                    let LUCKY_MD_XFORCE_TEXT = `
*═════════════════════*

🎉 *CONGRATULATIONS!* 🎉  
🔥 *LUCKY XFORCE MULTI DEVICE* 🗡️  
*Successfully Connected* to your WhatsApp 📱✨  
Welcome to a world of automation, power & freedom! 🚀💬

*═════════════════════*

📢 *Stay Updated & Get Support*  
👉 Join Our Official Channel  
🌍 Tech Tips | Bot News | Live Help  
🔗  
> https://whatsapp.com/channel/0029VbAjdiWBFLgXpS7VJz1u  
> https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P

🌐 *Visit Our Official Website*  
https://fredi-ai-site.vercel.app

📲 *Download Our App – Fredi AI*  
Smart Tools | Instant Help | Cool Features  
🔗  
> https://www.mediafire.com/file/chyvv2mktqc9jsv/fredi.ai.v2.9.9.apk

*═════════════════════*

🧠 *Want to Learn More?*  
🔧 GitHub Info & Source Codes  
👤 Main Repo — @Fred1e  
> https://github.com/Fred1e

👤 XFORCE Repo — @mr-X-force  
> https://github.com/mr-X-force

🆕 New Version:  
> https://github.com/mr-X-force/LUCKY-MD-XFORC

🗝️ Old Version:  
> https://github.com/Fred1e/LUCKY_MD  
✨ Don't forget to ⭐ Star & 🍴 Fork!

✅ Hosted Securely on *Heroku*

*═════════════════════*

💬 *Need Help? Message Me Anytime:*  
> 📞 https://wa.me/255752593977

👨‍💻 *This Project Was Built by*  
*FREDIETECH / FREDI AI™*

*═════════════════════*`;

                                    // Send welcome message
                                    await Pair_Code_By_Fredi_Ezra.sendMessage(
                                        Pair_Code_By_Fredi_Ezra.user.id, 
                                        { text: LUCKY_MD_XFORCE_TEXT }, 
                                        { quoted: session }
                                    ).catch(err => {
                                        console.error('Error sending welcome message:', err);
                                    });
                                    
                                    console.log('Welcome message sent successfully');
                                }
                            } else {
                                console.error('Creds file not found at:', credsPath);
                            }
                        } else {
                            console.error('User ID not available');
                        }
                    } catch (error) {
                        console.error('Error in connection open handler:', error);
                    }

                    // Clean up and close connection
                    await delay(5000);
                    try {
                        if (Pair_Code_By_Fredi_Ezra.ws) {
                            await Pair_Code_By_Fredi_Ezra.ws.close();
                        }
                    } catch (closeError) {
                        console.error('Error closing connection:', closeError);
                    }
                    
                    await removeFile('./temp/' + id);
                    console.log('Cleanup completed');
                    
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log('Connection closed, attempting reconnect...');
                    await delay(10000);
                    LUCKY_MD_XFORCE_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error('Error in LUCKY_MD_XFORCE_PAIR_CODE:', err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.status(503).send({ code: 'Service Unavailable', error: err.message });
            }
        }
    }

    return await LUCKY_MD_XFORCE_PAIR_CODE();
});

module.exports = router;
