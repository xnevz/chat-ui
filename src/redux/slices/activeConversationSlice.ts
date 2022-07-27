import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState } from "../../customHooks";
import { Message, MessageStatus } from "../../types/Message";
import { User } from "../../types/User";

export interface Conversation {
    messages: Message[],
    loadingState: FetchState

}

export interface ActiveConversation extends Conversation {
    activeFriend: User | null,
};

const initialState: ActiveConversation = {
    activeFriend: null,
    messages: [],
    loadingState: FetchState.Loading
};

const activeConversationSlice = createSlice({
    name: 'activeConversation',
    initialState,
    reducers: {
        setConversation(state, action: PayloadAction<Conversation>) {
            state.messages = action.payload.messages;
            state.loadingState = action.payload.loadingState;
        },
        addMessageToConversation(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
        setMessageStatus(state, action: PayloadAction<{ messageSendTime: number, status: MessageStatus }>) {
            const m = state.messages.find(m => m.sendTime == action.payload.messageSendTime);
            if (m != undefined)
                m.status = action.payload.status;
        },
        setActiveFriend(state, action: PayloadAction<User | null>) {
            state.activeFriend = action.payload;
        }
    }
})

export const activeConversationReducer = activeConversationSlice.reducer;

export const { setConversation, setActiveFriend, addMessageToConversation, setMessageStatus } = activeConversationSlice.actions;