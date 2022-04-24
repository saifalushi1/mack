const moment = require("moment")

const formatMessage = (username: String, text: String) => {
return {
    username,
    text,
    time: moment().format("h:mm a")
}
}

module.exports = formatMessage