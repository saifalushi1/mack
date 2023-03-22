import dbConnection from "../../../../connection";

export async function listOfAllMessagesFromUser(
    recipientId: number,
    creatorId: number,
) {
    const db = dbConnection();
    let arrMessageId: number[] = [];

    const messageIds = await db.any(
        "SELECT message_id FROM message_recipient WHERE recipient_id = $1",
        [recipientId],
    );

    arrMessageId = messageIds.map((n: { message_id: number }) => n.message_id);

    const allMessages = await db.any(
        "SELECT * FROM messages WHERE creator_id = $1 AND id IN ($2:list)",
        [creatorId, arrMessageId],
    );
    return allMessages;
}
