const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("Scan the QR code to connect WhatsApp");
});

client.on('ready', () => {
    console.log("PIUSXBOT Connected!");
});

client.on('message', async msg => {

const text = msg.body.toLowerCase();


// MENU
if(text === ".menu"){

msg.reply(`
╔══════════════════╗
   🤖 *PIUSXBOT*
╚══════════════════╝

👨‍💻 Developer: Pius
⚡ Classic WhatsApp Bot

╭─── BASIC ───
.menu
.ping
.time
.owner
.about

╭─── FUN ───
.joke
.quote
.romance
.football

╭─── MEDIA ───
.music
.video

╭─── AI ───
.ai hello

╭─── AUTO ───
.auto
.autostatus

╭───────────────╮
PIUSHUB | TECHWITHPIUS
╰───────────────╯
`);

}



// PING
if(text === ".ping"){
msg.reply("🏓 Pong! Bot is working perfectly.");
}



// TIME
if(text === ".time"){
msg.reply("⏰ Time: " + new Date().toLocaleString());
}



// OWNER
if(text === ".owner"){
msg.reply("👨‍💻 Owner: Pius\nBrand: PIUSHUB\nBot: PIUSXBOT");
}



// ABOUT
if(text === ".about"){
msg.reply("🤖 PIUSXBOT\nSmart WhatsApp Automation Bot\nCreated by Pius");
}



// AUTO REPLY
if(text === ".auto"){
autoReply = !autoReply
msg.reply("🤖 Auto Reply: " + (autoReply ? "ON" : "OFF"))
}



// AI SIMPLE
if(text.startsWith(".ai")){

const question = msg.body.slice(3)

msg.reply("🤖 AI Thinking...\n\nAnswer: "+question+" is interesting. I'm learning every day!")

}



// JOKE
if(text === ".joke"){

const jokes = [
"Why do programmers hate nature? Too many bugs.",
"Why JavaScript developer sad? Because he didn't Node how to Express himself.",
"I told my computer I need a break... it froze."
]

msg.reply(jokes[Math.floor(Math.random()*jokes.length)])

}



// ROMANCE
if(text === ".romance"){

const love = [
"I think about you more than code.",
"You are the WiFi to my heart.",
"My heart connects to you like Bluetooth."
]

msg.reply(love[Math.floor(Math.random()*love.length)])

}



// FOOTBALL
if(text === ".football"){

const facts = [
"⚽ Messi has won multiple Ballon d'Or awards.",
"⚽ The World Cup happens every 4 years.",
"⚽ Football is the most popular sport in the world."
]

msg.reply(facts[Math.floor(Math.random()*facts.length)])

}



// QUOTES
if(text === ".quote"){

const quotes = [
"Success comes from learning every day.",
"Small progress is still progress.",
"Dream big. Start small."
]

msg.reply(quotes[Math.floor(Math.random()*quotes.length)])

}



// MUSIC
if(text === ".music"){
msg.reply("🎵 Music feature coming soon in PIUSXBOT!");
}



// VIDEO
if(text === ".video"){
msg.reply("🎬 Video feature coming soon in PIUSXBOT!");
}



// AUTO REPLY
if(autoReply && !text.startsWith(".")){

msg.reply("🤖 PIUSXBOT Auto Reply: I received your message.")

}


});

client.initialize();