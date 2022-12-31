import db from "../../../../connection";

export async function listOfAllMessagesFromUser(
    recipientId: number,
    creatorId: number,
) {
    let arrMessageId: number[] = [];
    try {
        const messageIds = await db.any(
            "SELECT message_id FROM message_recipient WHERE recipient_id = $1",
            [recipientId],
        );

        arrMessageId = messageIds.map(
            (n: { message_id: number }) => n.message_id,
        );

        const allMessages = await db.any(
            "SELECT * FROM messages WHERE creator_id = $1 AND id IN ($2:list)",
            [creatorId, arrMessageId],
        );

        return allMessages;
    } catch (err) {
        throw err;
    }
}
