import { Message } from "../types/Message";
import { User } from "../types/User";

export interface CSRFResponse {
    token: string
};

export interface StatusResult {
    status: string
}

export interface LoginResult extends StatusResult {
    user: UserInfo
};

export interface UserInfo {
    username: string,
    id: number
}

export interface FriendsResponse {
    friends: User[];
}

export interface ConversationResponse {
    messages: Message[];
}