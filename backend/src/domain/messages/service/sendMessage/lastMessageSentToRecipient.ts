import db from "../../../../connection";

interface ILastMessageId {
    id: number;
}

export async function lastMessageSentToRecipient(
    creatorId: string,
    recipientId: string,
): Promise<void | ILastMessageId> {
    const lastMessageSentToRecipient = await db.oneOrNone(
        "SELECT messages.id FROM messages LEFT JOIN message_recipient " +
            "ON messages.id = message_recipient.message_id WHERE messages.creator_id = $1 AND message_recipient.recipient_id = $2 ORDER by messages.id DESC LIMIT 1",
        [creatorId, recipientId],
    );
    return lastMessageSentToRecipient;
}
