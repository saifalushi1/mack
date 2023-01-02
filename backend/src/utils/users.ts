//storing users in memory right now but should implement with a db like redis
// if the app gets too large
interface User {
    id: string;
    username: string;
    room: number;
}
const users: Array<User> = [];

// Join user to chat
export function userJoin(
    id: string,
    username: string,
    room: number,
): User | undefined {
    const user = { id, username, room };
    const userFound = users.filter((userToCheck) => {
        return userToCheck.username === user.username;
    });
    if (userFound.length > 0) {
        return undefined;
    }
    users.push(user);
    return user;
}

// Get current user
export function getCurrentUser(id: string) {
    return users.find((user) => user.id === id);
}

// User leaves chat
export function userLeave(id: string) {
    const index = users.findIndex((user) => user.id === id);
    const userToLeave = users[index];
    if (!userToLeave) {
        return { id: -1, username: null, room: -1 };
    }
    users.splice(index, 1)[0];
    return userToLeave;
}

// Get room users
export function getRoomUsers(room: number) {
    return users.filter((user) => user.room === room);
}
