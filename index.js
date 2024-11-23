require('dotenv').configDotenv()
const { Bot, GrammyError, HttpError, } = require('grammy');
const { commanadsReplicas, unsuportedFunctionalityReplicas, } = require('./replicas.json')

const bot = new Bot(process.env.BOT_API_KEY)



bot.command('start', async (ctx) => {
    await ctx.reply(commanadsReplicas.start)
})

bot.command('hi', async (ctx) => {
    await bot.api.sendMessage(1999101740, "hello")
})

bot.command('hi', async (ctx) => {
    try {
        await bot.api.sendMessage(ctx.chat.id, "hello"); // Send to the chat, not your own ID
        console.log(ctx.chat.id); // Log the chat ID
    } catch (error) {
        console.error("Error sending message:", error);
    }
});

bot.on('message:voice', async (ctx) => {
    await ctx.reply(unsuportedFunctionalityReplicas.voice)
})

bot.on('message:text', async (ctx) => {
    await ctx.reply(unsuportedFunctionalityReplicas.text)
})

bot.on('message:media', async (ctx) => {
    await ctx.reply(unsuportedFunctionalityReplicas.media)
})

bot.on('message:file', async (ctx) => {
    await ctx.reply(unsuportedFunctionalityReplicas.file)
})
// bot.on('message:url', async (ctx) => {
//     await ctx.reply(unsuportedFunctionalityReplicas.url)
// })


bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start();