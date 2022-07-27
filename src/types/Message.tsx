import { BaseUser } from "./User";

export enum MessageStatus {
    Pending = 'sending',
    Sent = 'sent',
    Delivered = 'delivered',
    Seen = 'seen'
}

export interface Message {
    content: string;
    sendTime: number;
    status: MessageStatus;
    seenTime: Date | null;
    fromMe: boolean;
    senderId: number;
    senderActive: boolean;
}