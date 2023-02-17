import db from "../connection";

interface User {
    id: string;
    userName: string;
    room: number;
    roomName?: string;
}

// Join user to chat
export async function userJoin(user: User): Promise<User | undefined> {
    const userFound = await db.result(
        "SELECT * FROM chats WHERE user_id = $1",
        [user.id],
    );
    if (userFound.rowCount > 0) {
        removeUserFromChat(parseInt(user.id));
    }
    await db.none(
        "INSERT INTO chats (room_number, username, user_id, time_joined, room_name) VALUES($<user.room>, $<user.userName>, $<user.id>, current_timestamp, $<user.roomName>)",
        { user },
    );
    return user;
}

// Get current user
export async function getCurrentUser(id: string) {
    const user = await db.one("SELECT * FROM chats WHERE user_id = $1", [id]);

    return user;
}

// removes user from chat
async function removeUserFromChat(id: number): Promise<void> {
    await db.none("DELETE FROM chats WHERE user_id = $1", [id]);
}

// Get room users
export async function getRoomUsers(room: number) {
    return await db.one(
        "SELECT room_number FROM chats where room_number = $1",
        [room],
    );
}
