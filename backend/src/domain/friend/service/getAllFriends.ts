import { UsersFriends } from "..";
import dbConnection from "../../../connection";

export async function getAllFriendsList(): Promise<UsersFriends[]> {
    const db = dbConnection();
    try {
        const friendsList = await db.any(
            "SELECT a.username, b.username FROM friends JOIN users a ON a.id = user_a JOIN users b ON b.id = user_b ORDER BY a.username, b.username",
        );
        return friendsList;
    } catch (err) {
        throw new Error(`getAllFriends failed because of: ${err}`);
    }
}
