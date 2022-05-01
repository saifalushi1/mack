import moment from "moment"

export const formatMessage = (username: String, text: String) => {
return {
    username,
    text,
    time: moment().format("h:mm a")
}
}
