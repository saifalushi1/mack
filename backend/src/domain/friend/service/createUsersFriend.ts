import { randomUUID } from "crypto";
import db from "../../../connection";

interface RequestSentSuccess {
    result: "success";
}
interface RequestSentFailure {
    result: "failure";
    message?: string;
}
type RequestSentResult = RequestSentSuccess | RequestSentFailure;

export async function createUsersFriend(
    userId: number,
    friendId: number,
): Promise<RequestSentResult> {
    //check if user sent friend request already
    const doesRequestExist = await db.oneOrNone(
        "SELECT status FROM friends WHERE user_a = $1 AND user_b = $2",
        [userId, friendId],
    );
    if (!doesRequestExist) {
        const roomId = randomUUID();
        await db.none(
            "INSERT INTO friends (friendship_id, timestamp, user_a, user_b, status, room_id) VALUES (DEFAULT, DEFAULT, $<userId>, $<friendId>, $<status>, $<roomId>)",
            { userId, friendId, status: 2, roomId },
        );
        return { result: "success" };
    } else {
        return { result: "failure" };
    }
}
