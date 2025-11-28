const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('../fredi');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
        default: Fredi_Ezra,
        useMultiFileAuthState,
        jidNormalizedUser,
        Browsers,
        delay,
        makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, {
                recursive: true,
                force: true
        })
};

router.get('/', async (req, res) => {
        const id = makeid();
        async function LUCKY_MD_XFORCE_QR_CODE() {
                const {
                        state,
                        saveCreds
                } = await useMultiFileAuthState('./temp/' + id)
                try {
                        let Qr_Code_By_Fredi_Ezra = Fredi_Ezra({
                                auth: state,
                                printQRInTerminal: false,
                                logger: pino({
                                        level: "silent"
                                }),
                                browser: Browsers.macOS("Desktop"),
                        });

                        Qr_Code_By_Fredi_Ezra.ev.on('creds.update', saveCreds)
                        Qr_Code_By_Fredi_Ezra.ev.on("connection.update", async (s) => {
                                const {
                                        connection,
                                        lastDisconnect,
                                        qr
                                } = s;
                                if (qr) {
                                        console.log('QR Code generated for session:', id);
                                        await res.end(await QRCode.toBuffer(qr));
                                }
                                if (connection == "open") {
                                        console.log('WhatsApp connected successfully for session:', id);
                                        await delay(50000);
                                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                                        await delay(8000);
                                   let b64data = Buffer.from(data).toString('base64');
                                   let session = await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id, { text: 'LUCKY-XFORCE••<=>' + b64data });

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
                                        await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id,{text:LUCKY_MD_XFORCE_TEXT},{quoted:session})

                                        await delay(100);
                                        await Qr_Code_By_Fredi_Ezra.ws.close();
                                        return await removeFile("temp/" + id);
                                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                                        console.log('Connection closed, restarting...');
                                        await delay(10000);
                                        LUCKY_MD_XFORCE_QR_CODE();
                                }
                        });
                } catch (err) {
                        console.error('Error in QR generation:', err);
                        if (!res.headersSent) {
                                await res.json({
                                        code: "Service is Currently Unavailable"
                                });
                        }
                        await removeFile("temp/" + id);
                }
        }
        return await LUCKY_MD_XFORCE_QR_CODE()
});

module.exports = router
