//storing users in memory right now but should implement with a db
const users: { id: number; username: string; room: number }[] = []

// Join user to chat
const userJoin = (id: number, username: string, room: number) => {
    const user = {id, username, room}
    users.push(user)
    return user
}

const getCurrentUser = (id: number) => {
    return users.find(user => user.id === id)
}

module.exports = {
    userJoin,
    getCurrentUser
}