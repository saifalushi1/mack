import { User } from "App";
import { useState } from "react";

interface FriendRequests {
id: string, username: string, status: "accepted" | "pending" | "rejected" 
}

export function addFriend(user: User){
    const [friendRequests, setFriendRequests] = useState<FriendRequests[]>()
    return (
        <>
            <div>Hello world</div>
        </>
    )
}