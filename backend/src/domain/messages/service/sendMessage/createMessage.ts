import db from "../../../../connection";

interface IMessageId {
    id: number;
}

export async function createMessage(
    creatorId: string,
    parentId: number | null,
    userMessage: string,
): Promise<IMessageId> {
    const message = await db.one(
        "INSERT INTO messages (id, parent_message_id, message_body, created_on, creator_id) VALUES (DEFAULT, $<parentId>, $<message>, current_timestamp, $<creator>) RETURNING id",
        {
            parentId,
            message: userMessage,
            creator: creatorId,
        },
    );
    return message;
}
