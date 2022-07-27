import { Message } from "./Message";

export interface BaseUser {
    id: number;
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    isConnected: boolean;
}

export interface User extends BaseUser {
    unreadMessages: Message[];
};
