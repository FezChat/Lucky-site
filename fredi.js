const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./frediqr'),
    code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

app.use('/frediqr', server);
app.use('/code', code);

// Serve HTML pages
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/fredipair.html')
});

app.use('/frediqr', async (req, res, next) => {
    res.sendFile(__path + '/frediqr.html')
});

app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/fredipage.html')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════╗
║       LUCKY MD XFORCE SERVER     ║
║    Powered by Fredi Tech Team    ║
║                                  ║
║  Server running on port: ${PORT}     ║
║  Main Dashboard: /               ║
║  Pair Dashboard: /pair           ║
║  QR Dashboard: /frediqr               ║
║                                  ║
║  Join our WhatsApp channel for   ║
║        more updates!             ║
╚══════════════════════════════════╝
`)
});

module.exports = app
