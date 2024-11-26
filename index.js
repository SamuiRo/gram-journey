const Telegram = require("./src/module/telegram/telegram")

async function main() {
    try {
        await Telegram.launch()
    } catch (error) {
        console.log(error)
    }
}

main()
