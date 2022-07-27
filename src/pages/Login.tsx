import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginResult } from '../api/ResponseTypes';
import { FetchState, useInput } from '../customHooks';
import { setUserInfo } from '../redux/slices/currentUserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function Login() {
    const navigate = useNavigate();
    const userData = useAppSelector(state => state.currentUser);
    const dispatch = useAppDispatch();

    const password = useInput();
    const username = useInput();

    async function handleLoginAsync() {
        try {
            const data = new FormData();
            data.append('username', username.value);
            data.append('password', password.value);
            data.append('csrfmiddlewaretoken', userData?.csrf_token ?? '');

            const result = await axios.post<LoginResult>('login/', data);
            dispatch(setUserInfo([result.data.user, FetchState.Success]));

            navigate('/');

        } catch (error) {
            alert('login failed : ' + error);
        }
    }

    return (
        <div className="auth login">
            <form>
                <input type="text" placeholder='Username' name='username' {...username} />
                <input type="password" autoComplete='login-password' placeholder='Password' name='password' {...password} />
                <button type="button" onClick={handleLoginAsync}>Login</button>
            </form>
        </div>
    )

};
