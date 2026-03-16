// bot.js - PIUSXBOT
const fs = require('fs');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Initialize client with local auth for persistent session
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

// Generate QR code if no session exists
client.on('qr', qr => {
    // Print ASCII QR in server logs
    const qrcodeTerminal = require('qrcode-terminal');
    qrcodeTerminal.generate(qr, { small: true });
    console.log('Scan the QR code with WhatsApp to connect PIUSXBOT');

    // Also save QR as PNG for easier scanning
    qrcode.toFile('qr.png', qr, { type: 'png' })
        .then(() => console.log('QR code saved as qr.png — download to scan with your phone!'))
        .catch(err => console.error('Failed to save QR code:', err));
});

// Bot is ready
client.on('ready', () => {
    console.log('✅ PIUSXBOT Connected and Ready!');
});

// Optional: log all messages received (you can remove if not needed)
client.on('message', message => {
    console.log(`📩 Message from ${message.from}: ${message.body}`);
});

// Prevent Node from exiting (keep alive)
setInterval(() => {}, 1000);

// Initialize WhatsApp client
client.initialize();