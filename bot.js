// bot.js - PIUSXBOT Full Feature Version

const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

// Initialize client with persistent session
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

// QR Code event
client.on('qr', qr => {
    console.log("📩 Scan this QR code with WhatsApp to connect PIUSXBOT:");
    qrcode.generate(qr, { small: true });
    qrcode.toFile('qr.png', qr, { type: 'png' })
        .then(() => console.log("✅ QR saved as qr.png"))
        .catch(err => console.error(err));
});

// Ready event
client.on('ready', () => {
    console.log("✅ PIUSXBOT Connected and Ready!");
});

// Example: Auto-view status & auto like placeholder
client.on('message', async msg => {
    const chat = await msg.getChat();

    // Commands menu
    if (msg.body === '!menu') {
        const media = MessageMedia.fromFilePath('./slideshow/slide1.png'); // Example slide image
        chat.sendMessage(media);
        chat.sendMessage(
            '*PIUSXBOT MENU*\n' +
            '💡 1. Auto View Status\n' +
            '❤️ 2. Auto Like Status\n' +
            '🎵 3. Music Download\n' +
            '🎬 4. Video Download\n' +
            '🤖 5. AI Assistant (ChatGPT)\n' +
            '⚽ 6. Football Updates\n' +
            '💌 7. Romance Messages\n' +
            '📸 8. Slideshow\n' +
            '...and more!'
        );
    }

    // AI Assistant placeholder
    if (msg.body.startsWith('!ask ')) {
        const question = msg.body.replace('!ask ', '');
        // Replace this with actual ChatGPT API call if desired
        await msg.reply(`🤖 AI Answer placeholder: You asked "${question}"`);
    }

    // Auto view & auto like (placeholder)
    if (msg.body === '!autoview') {
        await msg.reply('✅ Auto view status activated (placeholder)');
    }
    if (msg.body === '!autolike') {
        await msg.reply('✅ Auto like status activated (placeholder)');
    }

    // Football messages example
    if (msg.body === '!football') {
        await msg.reply('⚽ Latest football update: Messi scored a goal!');
    }

    // Romance messages example
    if (msg.body === '!romance') {
        await msg.reply('💌 Sweet message: You are amazing today!');
    }
});

// Keep Node alive
setInterval(() => {}, 1000);

// Initialize client
client.initialize();