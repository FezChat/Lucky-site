const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
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
} = require("@fredi/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
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
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(50000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(8000);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id, { text: 'LUCKY-XFORCE••<=>' + b64data });
	
				   let LUCKY_MD_XFORCE_TEXT = `
*❒❒❒❒❒❒❒❒❒❒❒❒❒*

*CONGRATULATIONS 👏 LUCKY XFORCE MULTI DEVICE 🗡️ IS CONNECTED TO YOUR WHATSAPP🤞*

*❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒*
_📢 FOR UPDATE AND HELPING FOLLOW CHANNEL 🌎 OR VISIT WEBSITE 🌐_ 
*📢 channel link*
> https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P
*🌐 website link*
> https://fredietech-website.vercel.app

*❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒*
_ℹ️ FOR MORE INFORMATION ABOUT AS AND BOT_

*👤 main GitHub info* @follow
> https://GitHub.com/Fred1e 
*👤 sub GitHub info* @follow
> https://GitHub.com/mr-X-force 
*🆕 new version of lucky md
> https://github.com/mr-X-force/LUCKY-MD-XFORC
*🗝️ old version of lucky md*
> https://github.com/Fred1e/LUCKY_MD
> Don't forget 😜 fork 🍴 and star 🌟 repo
*All is safe on heroku 🟢*

*❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒*
 _💬 for any problem connect with me_
> https://wa.me/255752593977
*THIS PROJECT SCRIPTS CREATED BY FREDIETECH*
*❒❒❒❒❒❒❒❒❒❒❒❒❒❒❒*`
	 await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id,{text:LUCKY_MD_XFORCE_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Fredi_Ezra.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					LUCKY_MD_XFORCE_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await LUCKY_MD_XFORCE_QR_CODE()
});
module.exports = router
