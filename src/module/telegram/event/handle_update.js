const { Channel } = require("../../pot/models/index")
const { send_webhook_message } = require("../../discord/services/index")

const { DISCORD_WEBHOOK } = require("../../../config/app.config")

const blacklist_words = require("../../../config/blacklist_words.json")

const blacklist = new Set(blacklist_words)

async function handle_update(update) {
    const payload = {}
    try {
        const _message = update.message.text.toLowerCase()
        console.log(update)
        // console.log(update?.message?.media)

        // Перевіряємо, чи міститься яке-небудь ключове слово
        for (const word of blacklist) {
            if (_message.includes(word)) return
        }
        payload.content = update.message.text
        await send_webhook_message(DISCORD_WEBHOOK, payload)
    } catch (error) {
        console.log("UPDATE", error)
    }
}

module.exports = {
    handle_update
}