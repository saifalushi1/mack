import dbConnection from "../../../../connection";

export async function listOfLastTenMessagesSent(creatorId: string) {
    const db = dbConnection();
    const lastMessagesSent = await db.any(
        "SELECT * FROM messages WHERE creator_id = $1 ORDER BY id DESC LIMIT 10",
        [creatorId],
    );
    return lastMessagesSent;
}
