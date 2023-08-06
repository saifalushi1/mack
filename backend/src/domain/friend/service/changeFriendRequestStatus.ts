import db from "../../../connection";

interface changeFriendRequestSuccess {
    status: "success";
}
interface changeFriendRequestFailure {
    status: "failure";
    message?: string;
}

export type changeFriendRequestResult =
    | changeFriendRequestSuccess
    | changeFriendRequestFailure;
export async function changeFriendRequestStatus(
    friendRequestId: number,
    acceptFriendRequest: boolean,
): Promise<changeFriendRequestResult> {
    const friendRequest = await db.oneOrNone(
        "SELECT status FROM friends WHERE friendship_id = $1",
        [friendRequestId],
    );

    if (!friendRequest) {
        return {
            status: "failure",
            message: "friend request does not exist",
        };
    } else if (friendRequest.status !== 2) {
        return {
            status: "failure",
            message:
                "friend request has already been accepted/denied could not process request",
        };
    }
    //1 === accepted 0 === rejected
    const status = acceptFriendRequest === true ? 1 : 0;
    await db.none("UPDATE friends SET status = $1 WHERE friendship_id = $2", [
        status,
        friendRequestId,
    ]);
    return {
        status: "success",
    };
}
