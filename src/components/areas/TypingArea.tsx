import React, { useRef, useState } from 'react';
import { ChatWebSocket, initChatSocketConnectionAsync, MessageSendResponse } from '../../api/websocket/client';
import { useEffectAsync, useInput } from '../../customHooks';
import { Attachement } from '../../images/attachement'
import { SendIcon } from '../../images/send'
import { Smiley } from '../../images/smiley'
import { addMessageToConversation, setMessageStatus } from '../../redux/slices/activeConversationSlice';
import { addReceivedMessage } from '../../redux/slices/friendsSlice';
import { ConnectionState, setChatConnectionState } from '../../redux/slices/globalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MessageStatus } from '../../types/Message';

export default function TypingArea() {

    const chatSocket = useRef<ChatWebSocket>();
    const conversation = useAppSelector(s => s.activeConversation);
    const currentUser = useAppSelector(s => s.currentUser.user);
    const chatConnectionState = useAppSelector(s => s.global.chatConnectionState);

    const dispatch = useAppDispatch();

    const text = useInput();

    // Initialize the chat websocket channel
    useEffectAsync(async () => {

        dispatch(setChatConnectionState(ConnectionState.Initializing));

        async function initSocketAsync() {
            try {
                // await websocket initalization
                chatSocket.current = await initChatSocketConnectionAsync(
                    // on connection lost
                    cws => {

                        if (chatConnectionState != ConnectionState.Reconnecting)
                            dispatch(setChatConnectionState(ConnectionState.Disconnected));

                        setTimeout(() => {
                            dispatch(setChatConnectionState(ConnectionState.Reconnecting));
                            initSocketAsync();
                        }, 1000);
                    },
                    // on chat message
                    function (fromId, message) {
                        dispatch(addReceivedMessage({
                            from: fromId, message
                        }))
                    });

                // on success ...
                dispatch(setChatConnectionState(ConnectionState.JustConnected));

                setTimeout(() => {
                    dispatch(setChatConnectionState(ConnectionState.Connected));
                }, 1000);
            } catch (error) {

                // on error
                if (chatConnectionState != ConnectionState.Reconnecting)
                    dispatch(setChatConnectionState(ConnectionState.Disconnected));

                setTimeout(() => {
                    dispatch(setChatConnectionState(ConnectionState.Reconnecting));
                    initSocketAsync();
                }, 1000);
            }
        }

        await initSocketAsync();

    }, []);


    function handleSend() {
        const to = conversation.activeFriend?.id;
        if (to != undefined && text.value.trim() != '') {

            const sendTime = Date.now();

            dispatch(addMessageToConversation({
                content: text.value,
                fromMe: true,
                seenTime: null,
                sendTime,
                senderActive: true,
                senderId: currentUser?.id ?? -1,
                status: MessageStatus.Pending,
            }));

            chatSocket.current?.sendMessage<MessageSendResponse>(to, text.value, (data) => {
                dispatch(setMessageStatus({
                    messageSendTime: sendTime,
                    status: MessageStatus.Sent,
                }))
            });

            // clear text
            text.setValue('');
        }
    }

    function handleKeyUp(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key == 'Enter')
            handleSend();
    }

    return (
        <div className="message-typing-area">
            <Smiley />
            <input onKeyUp={handleKeyUp} {...text} type="text" placeholder="Type a message ..." />
            <button onClick={handleSend} className='send-button'>
                <SendIcon />
            </button>
            <Attachement />
        </div>
    )
}
