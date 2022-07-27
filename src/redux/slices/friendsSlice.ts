import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/Message";
import { User } from "../../types/User";


const initialState: {
    value: User[]
} = {
    value: []
};

const friendsSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
        setFriends(state, action: PayloadAction<User[]>) {
            state.value = action.payload;
        },
        addReceivedMessage(state, action: PayloadAction<{
            from: number,
            message: Message
        }>) {
            const { from, message } = action.payload;
            const friend = state.value.find(friend => friend.id == from);
            if (friend != undefined) {
                friend.unreadMessages.push(message);
            }
        }
    }
})

export const friendsReducer = friendsSlice.reducer;
export const { setFriends, addReceivedMessage } = friendsSlice.actions;