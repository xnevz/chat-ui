import { API_URL } from '../api/consts';
import CSRFInput from '../components/auth/CSRFInput';

export default function Signup() {

    return (
        <div className="auth login">
            <form action={API_URL + '/signup/'} method='post'>
                <CSRFInput />
                <input type="text" placeholder='Username' name='username' />
                <input type="password" autoComplete='login-password' placeholder='Password' name='password' />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
