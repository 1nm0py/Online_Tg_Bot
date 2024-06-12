const TelegramBot = require('node-telegram-bot-api');

const token = '7419595711:AAELPbqJeaPDeyj1q_i6WTb3_gCUFQGUK_0'

const { gameOptions, againOption } = require("./options")

const bot = new TelegramBot(token, { polling: true });

const obj = {}

const startGame = async chatId => {
    await bot.sendMessage(chatId, `0 dan 9 gacha son o'ylandi ?`);
    const randomNumber = Math.floor(Math.random() * 10);
    obj[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Sonni top!!!`, gameOptions)
}

const bot_fun = () => {
    bot.setMyCommands([
        {
            command: "/start", description: "Ishga tushirish"
        },
        {
            command: "/info", description: "Ma'lumot"
        },
        {
            command: "/game", description: "Oyinni boshlash"
        },
    ])

    bot.on('message', async (msg) => {
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await bot.sendSticker(chatId, 'https://sl.combot.org/hotcherry/webp/4xf09f918b.webp')
            return bot.sendMessage(chatId, `Assalomu alaykum ${msg.from?.first_name}`)
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, `UserName ${msg.from?.username}`)
        }
        if (text === "/game") {
            return startGame(chatId)
        }
        bot.sendMessage(chatId, `Uzur tushunmadim !??   ):`)
    });

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }

        if (data == obj[chatId]) {
            return bot.sendMessage(chatId, `Tabriklaymiz !!! Topdingiz ${obj[chatId]}`)
        } else {
            return bot.sendMessage(chatId, `Topa olmadingiz ${data} ):, Komp ${obj[chatId]} ni tanlagan edi `,
                againOption)
        }
    })
}

bot_fun();