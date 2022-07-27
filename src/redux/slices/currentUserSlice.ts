import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../api/ResponseTypes";
import { FetchState } from "../../customHooks";

const initialState: {
    csrf_token: string,
    userLoadingState: FetchState,
    user: UserInfo | null
} = {
    csrf_token: '',
    userLoadingState: FetchState.Loading,
    user: null,
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<[UserInfo | null, FetchState]>) {
            state.user = action.payload[0];
            state.userLoadingState = action.payload[1];
        },
        setCSRF(state, action: PayloadAction<string>) {
            state.csrf_token = action.payload;
        }
    }
})

export const currentUserReducers = currentUserSlice.reducer;

export const { setUserInfo, setCSRF } = currentUserSlice.actions;