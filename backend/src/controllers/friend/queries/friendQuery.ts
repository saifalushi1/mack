import db from "../../../connection";

interface UsersFriends {
    username: string;
}

export async function getAllFriendsList(): Promise<UsersFriends[]> {
    const friendsList = await db.any(
        "SELECT a.username, b.username FROM friends JOIN users a ON a.id = user_a JOIN users b ON b.id = user_b ORDER BY a.username, b.username"
    );
    return friendsList;
}

export async function getUsersFriendsList(userID: string): Promise<UsersFriends[]> {
    const friendsList = await db.any(
        "SELECT a.username, b.username FROM friends JOIN users a ON a.id = $1 JOIN users b ON b.id = user_b ORDER BY a.username, b.username",
        [userID]
    );
    console.log(friendsList);
    return friendsList;
}
