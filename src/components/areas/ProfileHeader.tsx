import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNewCSRFTokenAsync } from '../../api/fetchers';
import { FetchState } from '../../customHooks';
import { setCSRF, setUserInfo } from '../../redux/slices/currentUserSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import '../../styles/profile-header.scss';
import UserPicture from '../UserPicture'

export default function ProfileHeader() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUserId = useAppSelector(s => s.currentUser.user?.id);

    const [menuVisible, setMenuVisible] = useState(false);

    function toggleMenuVisibility() {
        setMenuVisible(!menuVisible);
    }

    async function handleLogoutAsync() {
        try {
            await axios.get('/logout');

            // invalidate user info by setting data to null and state to failure
            dispatch(setUserInfo([null, FetchState.Error]));

            // refresh csrf token
            const csrf = await getNewCSRFTokenAsync();
            dispatch(setCSRF(csrf ?? ''));

            // finally navigate to the login screen
            navigate('/login');
        } catch (error) {
            alert('logout failed');
        }
    }

    return (
        <div onClick={toggleMenuVisibility} className="profile-header">
            <UserPicture userId={currentUserId ?? -1} />
            <ul style={{ display: menuVisible ? 'block' : 'none' }} className="menu">
                <li onClick={handleLogoutAsync}>Logout</li>
            </ul>
        </div>
    )
}
