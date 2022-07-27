import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { activeConversationReducer } from "./slices/activeConversationSlice";
import { currentUserReducers } from "./slices/currentUserSlice";
import { friendsReducer } from "./slices/friendsSlice";
import { globalReducer } from "./slices/globalSlice";


export const store = configureStore({
    reducer: {
        friends: friendsReducer,
        currentUser: currentUserReducers,
        activeConversation: activeConversationReducer,
        global: globalReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;