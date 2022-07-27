import { API_WS_URL } from "../consts";
import { v4 as uuid } from 'uuid';
import { Message } from "../../types/Message";

type MessageResponseCallback<ResponseType> = (data: ResponseType) => void;

export interface MessageSendResponse {
    id: string;
    success: boolean;
    reason?: string;
};

export class ChatWebSocket {
    ws: WebSocket;
    callbacks: Map<string, MessageResponseCallback<any>>;
    onChatMessage: (fromId: number, message: Message) => void;

    constructor(ws: WebSocket, onChatMessage: typeof ChatWebSocket.prototype.onChatMessage) {
        this.ws = ws;
        this.ws.onmessage = this.onMessage.bind(this);
        this.callbacks = new Map();
        this.onChatMessage = onChatMessage;
    }

    onMessage(ev: MessageEvent<any>) {
        const data = JSON.parse(ev.data);

        // get the message uuid
        const id: string | undefined = data['id'];

        // if there is a uuid that means it is a response to a request
        if (id) {
            // try find the callback and invoke it
            if (this.callbacks.has(id)) {
                const c = this.callbacks.get(id);
                if (c)
                    c(data);
            }
        } else if (data['type'] != undefined) {
            const type = data['type'];

            if (type == 'message') {
                this.onChatMessage(data['from'], data['message'] as Message);
            }
        }
    }

    sendMessage<ResponseType>(toUser: number, content: string, callback: MessageResponseCallback<ResponseType>) {
        // generate an id for the message
        const id = uuid();

        // set the callback
        this.callbacks.set(id, callback);

        // send the message
        this.ws.send(JSON.stringify({
            type: 'send',
            toUser, content, id,
        }));
    }
}

export function initChatSocketConnectionAsync(connectionLostCallback: (cws: ChatWebSocket) => void, onChatMessage: typeof ChatWebSocket.prototype.onChatMessage) {

    return new Promise<ChatWebSocket>((resolve, reject) => {
        try {
            const ws = new WebSocket(API_WS_URL + '/chat/ws/');
            const chatWs = new ChatWebSocket(ws, onChatMessage);

            ws.onclose = function (ev) {
                connectionLostCallback(chatWs);
            };

            ws.onopen = function () {
                setTimeout(() => {
                    resolve(chatWs);
                }, 2000);
            }
        } catch (error) {
            reject('Websocket creation failed');
        }
    });
}

