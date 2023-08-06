import db from "../../../connection";

interface FriendRequestResponse {
    friendship_id: number;
}

interface FriendRequestListSuccess {
    status: "success";
    listOfFriendRequests: FriendRequestResponse[];
}

interface FriendRequestListFailure {
    status: "failure";
    message?: string;
}

type FriendRequestListResult =
    | FriendRequestListSuccess
    | FriendRequestListFailure;

export async function getUserFriendRequests(
    userId: number,
): Promise<FriendRequestListResult> {
    const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
        userId,
    ]);
    if (!user) {
        return {
            status: "failure",
            message: "user does not exist",
        };
    }

    const listOfFriendRequests = await db.manyOrNone(
        "SELECT id FROM friends WHERE user_b = $1 AND status === 2",
    );

    return {
        status: "success",
        listOfFriendRequests,
    };
}
