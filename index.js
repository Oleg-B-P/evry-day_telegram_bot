require('dotenv').configDotenv()
const { Bot, GrammyError, HttpError, } = require('grammy');
const { comamnadsReplicas, noFunctionsReplicas, } = require('./replicas.json')

const bot = new Bot(process.env.BOT_API_KEY)







bot.on('message:voice', async (ctx) => {
    await ctx.reply(noFunctionsReplicas.voice)
})

// bot.on('message:text', async (ctx) => {
//     await ctx.reply(noFunctionsReplicas.text)
// })
bot.on('message:media', async (ctx) => {
    await ctx.reply(noFunctionsReplicas.media)
})

bot.command('start', async (ctx) => {
    await ctx.reply(comamnadsReplicas.start)
})



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