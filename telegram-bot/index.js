const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = '8067174580:AAFkJbfepoY1N_thlrgs2t0HZinl1DLpUCo'; // Replace with your actual bot token
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Endpoint to receive updates from Telegram
app.post('/webhook', async (req, res) => {
    const message = req.body.message;

    if (message && message.text) {
        const chatId = message.chat.id;
        const replyText = `You said: ${message.text}`;

        // Send a reply back to the user
        try {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: replyText,
            });
        } catch (error) {
            console.error('Error sending message to Telegram', error);
        }
    }

    res.sendStatus(200);
});

app.get('/', async (req, res) => {
    res.send('Hello');
})


// Export the app for Vercel
module.exports = app;
