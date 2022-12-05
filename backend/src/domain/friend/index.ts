import { getUserFriends } from "./getUsersFriends";
import { getAllFriends } from "./getAllFriends";
import { createFriend } from "./createFriend";

export { getAllFriends, createFriend, getUserFriends };

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
