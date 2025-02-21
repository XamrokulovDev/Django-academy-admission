const TelegramBot = require('node-telegram-bot-api');
const { startController } = require('./controllers/start.controller');
require('dotenv').config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

// /start buyrug'i
bot.onText(/\/start/, (msg) => {
    startController(bot, msg);
});