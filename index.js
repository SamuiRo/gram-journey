const Telegram = require("./src/module/telegram/telegram")
const sequelize = require("./src/module/pot/sqlite_db")

async function main() {
    try {
        await _connectDB()

        await Telegram.launch()
    } catch (error) {
        console.log(error)
    }
}

async function _connectDB() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log("Database Connected")
    } catch (error) {
        console.log(error)
        notify("connectDB " + error.message)
    }
}

main()
