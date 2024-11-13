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

    // Handle text messages
    if (message && message.text) {
        const chatId = message.chat.id;
        const replyText = `You said: ${message.text}`;

        // Send a reply back to the user
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: replyText,
        });
    }

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
