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
                const { connection, lastDisconnect } = s;
                console.log('Connection update:', connection);
                
                if (connection === 'open') {
                    console.log('✅ Connection opened successfully');
                    console.log('User ID:', Pair_Code_By_Fredi_Ezra.user.id);
                    
                    // Wait for connection to fully stabilize
                    await delay(3000);
                    
                    try {
                        // Verify the user object exists and connection is ready
                        if (Pair_Code_By_Fredi_Ezra.user && Pair_Code_By_Fredi_Ezra.user.id) {
                            
                            // Wait a bit more to ensure WhatsApp is fully ready
                            await delay(2000);
                            
                            // Read session data
                            const credsPath = __dirname + `/temp/${id}/creds.json`;
                            if (fs.existsSync(credsPath)) {
                                let data = fs.readFileSync(credsPath);
                                let b64data = Buffer.from(data).toString('base64');
                                
                                console.log('📤 Sending session data...');
                                
                                // Send session data first
                                let sessionMsg = await Pair_Code_By_Fredi_Ezra.sendMessage(
                                    Pair_Code_By_Fredi_Ezra.user.id, 
                                    { text: 'LUCKY-XFORCE••<=>' + b64data }
                                ).catch(err => {
                                    console.error('❌ Error sending session data:', err);
                                    return null;
                                });

                                if (sessionMsg) {
                                    console.log('✅ Session data sent successfully');
                                    
                                    // Wait before sending welcome message
                                    await delay(1000);
                                    
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

                                    console.log('📤 Sending welcome message...');
                                    
                                    // Send welcome message
                                    await Pair_Code_By_Fredi_Ezra.sendMessage(
                                        Pair_Code_By_Fredi_Ezra.user.id, 
                                        { text: LUCKY_MD_XFORCE_TEXT }
                                    ).then(() => {
                                        console.log('✅ Welcome message sent successfully!');
                                    }).catch(err => {
                                        console.error('❌ Error sending welcome message:', err);
                                    });
                                    
                                } else {
                                    console.error('❌ Failed to send session data');
                                }
                            } else {
                                console.error('❌ Creds file not found at:', credsPath);
                            }
                            
                            // Wait to ensure messages are delivered before closing
                            console.log('⏳ Waiting for messages to be delivered...');
                            await delay(5000);
                            
                        } else {
                            console.error('❌ User ID not available or connection not ready');
                        }
                    } catch (error) {
                        console.error('❌ Error in connection open handler:', error);
                    }

                    // Clean up
                    console.log('🧹 Starting cleanup process...');
                    try {
                        if (Pair_Code_By_Fredi_Ezra.ws) {
                            await Pair_Code_By_Fredi_Ezra.ws.close();
                            console.log('🔌 Connection closed');
                        }
                    } catch (closeError) {
                        console.error('❌ Error closing connection:', closeError);
                    }
                    
                    await removeFile('./temp/' + id);
                    console.log('✅ Cleanup completed');
                    
                } else if (connection === 'close') {
                    console.log('🔌 Connection closed');
                    if (lastDisconnect && lastDisconnect.error) {
                        console.log('Last disconnect error:', lastDisconnect.error);
                    }
                }
            });

            // Handle messages events to see if we're receiving anything
            Pair_Code_By_Fredi_Ezra.ev.on('messages.upsert', (data) => {
                console.log('📨 Messages upsert event:', data);
            });

        } catch (err) {
            console.error('❌ Error in LUCKY_MD_XFORCE_PAIR_CODE:', err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.status(503).send({ code: 'Service Unavailable', error: err.message });
            }
        }
    }

    return await LUCKY_MD_XFORCE_PAIR_CODE();
});

module.exports = router;
