// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const TELEGRAM_TOKEN = '8067174580:AAFkJbfepoY1N_thlrgs2t0HZinl1DLpUCo'; // Replace with your bot's token
const GAME_URL = 'https://ai-based-tic-tac.vercel.app'; // Full URL of your frontend game

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle updates from Telegram
app.post(`/webhook`, async (req, res) => {
    const update = req.body;

    if (update.message) {
        const chatId = update.message.chat.id;

        // Send game WebView link to user
        await sendWebView(chatId);
    }

    res.sendStatus(200); // Respond to Telegram's request
});

// Simple health check for the root endpoint
app.get("/", (req, res) => {
    res.send("hello");
})

// Function to send WebView game link to the user
async function sendWebView(chatId) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const message = {
        chat_id: chatId,
        text: "Click below to play the game directly in Telegram!",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Play Game",
                        web_app: {
                            url: GAME_URL, // The URL of your game
                        }
                    }
                ]
            ]
        }
    };

    try {
        await axios.post(url, message); // Send the message with the WebView button
    } catch (error) {
        console.error("Error sending message: ", error);
    }
}

module.exports = app;
