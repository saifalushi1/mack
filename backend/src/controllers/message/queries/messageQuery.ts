import db from "../../../connection";

interface ILastMessageId {
    id: number;
}

interface IMessageId {
    id: number;
}

export async function lastMessageSentToRecipient(
    creatorId: string,
    recipientId: string
): Promise<void | ILastMessageId> {
    const lastMessageSentToRecipient = await db.oneOrNone(
        "SELECT messages.id FROM messages LEFT JOIN message_recipient " +
            "ON messages.id = message_recipient.message_id WHERE messages.creator_id = $1 AND message_recipient.recipient_id = $2 ORDER by messages.id DESC LIMIT 1",
        [creatorId, recipientId]
    );
    return lastMessageSentToRecipient;
}

export async function createMessage(
    creatorId: string,
    parentId: number | null,
    userMessage: string
): Promise<IMessageId> {
    const message = await db.one(
        "INSERT INTO messages (id, parent_message_id, message_body, created_on, creator_id) VALUES (DEFAULT, $<parentId>, $<message>, current_timestamp, $<creator>) RETURNING id",
        {
            parentId,
            message: userMessage,
            creator: creatorId
        }
    );
    return message;
}

export async function putMessageIntoRecipientTable(
    groupId: number | null,
    recipientId: number,
    id: number
): Promise<void> {
    await db.none(
        "INSERT INTO message_recipient (id, recipient_group_id, recipient_id, message_id) VALUES (DEFAULT, $<group_id>, $<recipient_id>, $<message>)",
        {
            group_id: groupId,
            recipient_id: recipientId,
            message: id
        }
    );
}

export async function listOfAllMessagesFromUser(recipientId: number, creatorId: string) {
    let arrMessageId: number[] = [];
    try {
        const messageIds = await db.any(
            "SELECT message_id FROM message_recipient WHERE recipient_id = $1",
            [recipientId]
        );

        arrMessageId = messageIds.map((n: { message_id: number }) => n.message_id);

        const allMessages = await db.any(
            "SELECT * FROM messages WHERE creator_id = $1 AND id IN ($2:list)",
            [creatorId, arrMessageId]
        );

        return allMessages;
    } catch (err) {
        throw err;
    }
}

export async function listOfLastTenMessagesSent(creatorId: string) {
    const lastMessagesSent = await db.any(
        "SELECT * FROM messages WHERE creator_id = $1 ORDER BY id DESC LIMIT 10",
        [creatorId]
    );
    return lastMessagesSent;
}
