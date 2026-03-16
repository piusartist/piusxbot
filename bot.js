// bot.js - PIUSXBOT ready for cloud deployment
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Initialize client with LocalAuth to persist session
const client = new Client({
    authStrategy: new LocalAuth(), 
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-first-run",
            "--no-zygote",
            "--single-process"
        ]
    }
});

// Generate QR code if session doesn't exist
client.on('qr', qr => {
    console.log("📩 Scan this QR code with WhatsApp to connect PIUSXBOT:");
    qrcode.generate(qr, { small: true }); // ASCII QR in logs

    // Save QR as image (optional)
    qrcode.toFile('qr.png', qr, { type: 'png' })
        .then(() => console.log("✅ QR code saved as qr.png — download it to scan"))
        .catch(err => console.error("❌ Failed to save QR code:", err));
});

// Bot ready
client.on('ready', () => {
    console.log("✅ PIUSXBOT Connected and Ready!");
});

// Example: respond to messages
client.on('message', async message => {
    if (message.body === '!menu') {
        await message.reply('Hello! PIUSXBOT Menu:\n1. Auto Status\n2. Auto Like\n3. Music\n4. Video\n5. AI Assistant\n6. Football updates\n7. Romance messages\n8. More coming soon...');
    } else {
        console.log(`📩 Message from ${message.from}: ${message.body}`);
    }
});

// Keep Node alive (server won't exit)
setInterval(() => {}, 1000);

// Start the client
client.initialize();