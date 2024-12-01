const sequelize = require("./src/module/pot/sqlite_db")
const { List } = require("./src/module/pot/models/index")

const whitelist = require("./src/config/keywords.json")
const blacklist = require("./src/config/blacklist_words.json")

async function upload() {
    try {
        await _connectDB()

        await List.upsert({
            type: "whitelist",
            keywords: whitelist
        })

        await List.upsert({
            type: "blacklist",
            keywords: blacklist
        })

        console.log("Uploaded")
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
        notify("Upload | connectDB " + error.message)
    }
}

upload()