import db from "../../../../connection";

export async function putMessageIntoRecipientTable(
    groupId: number | null,
    recipientId: number,
    id: number,
): Promise<void> {
    await db.none(
        "INSERT INTO message_recipient (id, recipient_group_id, recipient_id, message_id) VALUES (DEFAULT, $<group_id>, $<recipient_id>, $<message>)",
        {
            group_id: groupId,
            recipient_id: recipientId,
            message: id,
        },
    );
}
