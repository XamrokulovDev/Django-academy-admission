const { saveStudent } = require("../models/student.model");

async function startController(bot, msg) {
    const chatId = msg.chat.id;

    const result = await saveStudent(chatId);

    bot.sendMessage(chatId, result.message);
}

module.exports = { startController };