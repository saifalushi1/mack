import { UsersFriends } from "..";
import dbConnection from "../../../connection";

export async function getUsersFriendsList(
    userID: string,
): Promise<UsersFriends[]> {
    const db = dbConnection();
    try {
        const friendsList = await db.any(
            "SELECT a.username, b.username FROM friends JOIN users a ON a.id = $1 JOIN users b ON b.id = user_b ORDER BY a.username, b.username",
            [userID],
        );
        return friendsList;
    } catch (err) {
        throw new Error(`getUsersFriendsList failed becasue of: ${err}`);
    }
}
