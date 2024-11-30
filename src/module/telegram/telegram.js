const os = require("os")
const { TelegramClient } = require("telegram")
const { StringSession } = require("telegram/sessions")
const { NewMessage } = require("telegram/events")

const pkg = require("../../../package.json")
const keywords = require("../../config/keywords.json")

const { SESSION, API_ID, API_HASH } = require("../../config/app.config")
const { Channel } = require("../pot/models/index")
const { handle_update } = require("./event/index")

const stringSession = new StringSession(SESSION) // fill this later with the value from session.save()

const client_options = {
    deviceModel: `${pkg.name}@${os.hostname()}`,
    systemVersion: os.version() || "Unknown node",
    appVersion: pkg.version,
    useWSS: true, // not sure if it works in node at all
    testServers: false,// this one should be the default for node env, but who knows for sure :)
    connectionRetries: 5
}

const client = new TelegramClient(stringSession, API_ID, API_HASH, client_options)

async function launch() {
    try {
        console.log("Launch Telegram client")
        await client.start({
            phoneNumber: async () => await input.text("number ?"),
            password: async () => await input.text("password ?"),
            phoneCode: async () => await input.text("code ?"),
            onError: (error) => console.log(error),
        })

        console.log("Add Event Handler")
        await add_event_handlers()
        console.log("You should now be connected")
    } catch (error) {
        console.log("LAUNCH", error)
    }
}

async function add_event_handlers() {
    const pattern = new RegExp(keywords.join("|"), "i");
    try {
        // const filtred_ids = await getAllChannelIds()

        // client.addEventHandler(handle_update, new NewMessage({ chats: filtred_ids }))
        client.addEventHandler(handle_update, new NewMessage({ pattern }))
    } catch (error) {
        console.log("ADD EVENT", error)
    }
}

async function getAllChannelIds() {
    try {
        const channels = await Channel.findAll({
            where: { translate: false },
            attributes: ['channel_id'] // Вибираємо тільки поле channel_id
        });

        // Отримуємо масив тільки з channel_id
        const channelIds = channels.map(channel => channel.channel_id);
        return channelIds;
    } catch (error) {
        console.error('Помилка при отриманні channel_id:', error.message);
        return [];
    }
}

module.exports = {
    launch
}