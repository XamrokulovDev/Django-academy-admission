exports.startController = (bot, msg) => {
  const chatId = msg.chat.id;
  const text = `Assalomu alaykum, <b>${msg.from.first_name}</b>! Botimizga xush kelibsiz! Botdan foydalanishni boshlash uchun iltimos, ismingizni kiriting.`;

//   start comand 
  bot.sendMessage(chatId, text, {
    parse_mode: "HTML",
  });
};