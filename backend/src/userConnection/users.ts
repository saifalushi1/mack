import db from "../connection";

interface User {
    id: number;
    userName: string;
    room: number;
    socketId: string;
    roomName?: string;
}

interface userRoom {
    room_number: number;
    username: string;
    user_id: number;
    time_joined: Date;
    room_name: null | string;
    socket_id: string;
}

// Join user to chat
export async function userJoin(user: User): Promise<User | undefined> {
    console.log("userJoin", user.id);
    const userExists = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
        user.id,
    ]);
    if (!userExists) {
        return undefined;
    }

    const userFound = await db.oneOrNone(
        "SELECT * FROM chats WHERE user_id = $1",
        [user.id],
    );
    if (userFound) {
        await removeUserFromChat(user.id);
    }
    console.log(user.id);
    await db.none(
        "INSERT INTO chats (room_number, username, user_id, time_joined, room_name, socket_id) VALUES($<user.room>, $<user.userName>, $<user.id>, current_timestamp, $<user.roomName>, $<user.socketId>)",
        { user },
    );
    return user;
}

// Get current user
export async function getCurrentUser(id: string): Promise<User | undefined> {
    const user: userRoom | null = await db.oneOrNone(
        "SELECT * FROM chats WHERE socket_id = $1",
        [id],
    );
    if (!user) {
        return undefined;
    }
    return {
        id: user.user_id,
        room: user.room_number,
        socketId: user.socket_id,
        userName: user.username,
    };
}

// removes user from chat
export async function removeUserFromChat(id: number): Promise<void> {
    await db.none("DELETE FROM chats WHERE user_id = $1", [id]);
}

// Get room users
export async function getRoomUsers(room: number): Promise<number> {
    return await db.one(
        "SELECT room_number FROM chats where room_number = $1",
        [room],
    );
}
