export * from "./getUsersFriends";
export * from "./createFriend";
export * from "./getPendingFriendRequests";
export * from "./editFriendRequest";

export interface UsersFriends {
    username: string;
}

export interface accepted {
    status: 0;
}

export interface rejected {
    status: 1;
}

export interface pending {
    status: 2;
}
