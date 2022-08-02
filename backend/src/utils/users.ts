//storing users in memory right now but should implement with a db like redis
// if the app gets too large
const users: Array<{ id: string; username: string; room: number }> = [];

// Join user to chat
const userJoin = (id: string, username: string, room: number) => {
    const user = { id, username, room };
    users.push(user);
    return user;
};

// Get current user
const getCurrentUser = (id: string) => {
    return users.find((user) => user.id === id);
};

// User leaves chat
const userLeave = (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    const userToLeave = users[index];
    if (!userToLeave) {
        return { id: -1, username: null, room: -1 };
    }
    users.splice(index, 1)[0];
    return userToLeave;
};

// Get room users
const getRoomUsers = (room: number) => {
    return users.filter((user) => user.room === room);
};

export { userJoin, getCurrentUser, userLeave, getRoomUsers };
