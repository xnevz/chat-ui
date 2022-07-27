import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ConnectionState {
    Initializing = 'initializing',
    Disconnected = 'disconnected',
    Reconnecting = 'reconnecting',
    JustConnected = 'just-connected',
    Connected = 'connected'
}

const initialState = {
    chatConnectionState: ConnectionState.Initializing
};

const globalSlice = createSlice({
    initialState,
    name: 'global',
    reducers: {
        setChatConnectionState(state, action: PayloadAction<ConnectionState>) {
            state.chatConnectionState = action.payload;
        }
    }
});

export const globalReducer = globalSlice.reducer;
export const { setChatConnectionState } = globalSlice.actions;