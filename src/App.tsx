import axios, { AxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-adapter";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { API_URL } from "./api/consts";
import { getNewCSRFTokenAsync } from "./api/fetchers";
import { CSRFResponse, UserInfo } from "./api/ResponseTypes";
import EnsureGuest from "./components/EnsureGuest";
import PrivateRoute from "./components/route/PrivateRoute";
import { useAxiosGetPromise, usePromise } from "./customHooks";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import { setCSRF, setUserInfo } from "./redux/slices/currentUserSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import './styles/base.scss';

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// axios configuration
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.defaults.adapter = cache.adapter;

function App() {

    const dispatch = useAppDispatch();

    const { data: userInfoResponse, status: userInfoStatus } = useAxiosGetPromise<UserInfo>('user/');
    const { data: csrfResponse } = usePromise(getNewCSRFTokenAsync());

    useEffect(() => {
        dispatch(setUserInfo([userInfoResponse?.data ?? null, userInfoStatus]));
    }, [userInfoStatus]);


    useEffect(() => {
        dispatch(setCSRF(csrfResponse ?? ''));
    }, [csrfResponse]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute element={<Main />} />
                } />

                <Route path="/login" element={
                    <EnsureGuest>
                        <Login />
                    </EnsureGuest>
                } />

                <Route path="/signup" element={
                    <EnsureGuest>
                        <Signup />
                    </EnsureGuest>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
