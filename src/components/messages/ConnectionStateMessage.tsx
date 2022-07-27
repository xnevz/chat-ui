import React from 'react'
import { ConnectionState } from '../../redux/slices/globalSlice';
import { useAppSelector } from '../../redux/store';
import Message, { MessageType } from './Message';

export default function ConnectionStateMessage() {

    const chatConnectionState = useAppSelector(s => s.global.chatConnectionState);
    switch (chatConnectionState) {
        case ConnectionState.JustConnected:
            return <Message type={MessageType.Success} content='Connected to server !' />;

        case ConnectionState.Disconnected:
            return <Message type={MessageType.Danger} content='Disconnected from server !' />;

        case ConnectionState.Reconnecting:
            return <Message type={MessageType.Warning} content='Reconnecting to server ...' />;

        case ConnectionState.Connected:
        case ConnectionState.Initializing:
        default:
            return null;
    }
}
