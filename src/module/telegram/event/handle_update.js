const { Channel } = require("../../pot/models/index")
const { send_webhook_message } = require("../../discord/services/index")

const { DISCORD_WEBHOOK } = require("../../../config/app.config")

const blacklist_words = require("../../../config/blacklist_words.json")

// Перетворюємо слова чорного списку в Set для швидкої перевірки
const blacklist = new Set(blacklist_words.map(word => word.toLowerCase().trim()));

async function handle_update(update) {
    const payload = {}
    try {
        // Перевіряємо, чи є текст у повідомленні
        const message_text = update?.message?.text?.toLowerCase();
        if (!message_text) return;
        console.log(update)

        // Перевіряємо, чи текст містить будь-яке слово з чорного списку
        const contains_black_listed_word = Array.from(blacklist).some(word => message_text.includes(word));
        if (contains_black_listed_word) return;
        // console.log(update?.message?.media)

        let sanitized_content = message_text
            .replace(/@here/g, 'here')
            .replace(/@everyone/g, 'everyone');

        payload.content = "# 〓 Update\n" + sanitized_content
        await send_webhook_message(DISCORD_WEBHOOK, payload)
    } catch (error) {
        console.log("UPDATE", error)
    }
}

module.exports = {
    handle_update
}