import React, { useEffect } from 'react';
import { ConversationResponse } from '../../api/ResponseTypes';
import { FetchState, useAxiosGetPromise, useEffectAsync } from '../../customHooks';
import { setConversation } from '../../redux/slices/activeConversationSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Message, MessageStatus } from '../../types/Message';
import MessageDetails from '../MessageDetails';

export interface DisplayMessage extends Message {
    firstInGroup: boolean;
    lastInGroup: boolean;
}

/**
 * Reducer arg fucntion that maps messages to display messages that have more display properties to help render the message
 */
function mapMessageToDisplayMessage(prev: DisplayMessage[], current: Message, index: number, arr: Message[]) {
    let firstInGroup = false;
    let lastInGroup = false;

    if (index == arr.length - 1)
        lastInGroup = true;
    else if (current.fromMe != arr[index + 1].fromMe)
        lastInGroup = true;
    else
        lastInGroup = false;

    if (index == 0)
        firstInGroup = true;
    else if (current.fromMe != arr[index - 1].fromMe)
        firstInGroup = true;
    else
        firstInGroup = false;

    prev.push({ ...current, lastInGroup, firstInGroup })

    return prev;
}

export default function MessagingArea() {

    const activeFriendId = useAppSelector(s => s.activeConversation.activeFriend?.id ?? null);

    const { data, status } = useAxiosGetPromise<ConversationResponse>(`conversation/${activeFriendId}/`, [activeFriendId], activeFriendId != null);

    const messages = useAppSelector(s => s.activeConversation.messages);

    const displayMessages = messages.reduce(mapMessageToDisplayMessage, []);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setConversation({
            loadingState: status,
            messages: data?.data.messages ?? []
        }));

    }, [data, status]);

    return (
        <div className="messages-container">
            {
                (() => {
                    switch (status) {
                        case FetchState.Success:
                            if ((displayMessages?.length ?? 0) > 0)
                                return displayMessages?.map((message, index) => <MessageDetails key={index} animOrder={index} message={{ ...message }} />);
                            else
                                return <p>No messages yet</p>;
                        case FetchState.Loading:
                            return activeFriendId == null ? <p>No user selected</p> : <p>Loading ...</p>;
                        case FetchState.Error:
                            return <p>Some Error Happened</p>;
                    }
                })()
            }
        </div>
    )
}
