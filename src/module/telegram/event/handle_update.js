const { Channel } = require("../../pot/models/index")

async function handle_update(update) {
    try {
        console.log(update)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handle_update
}