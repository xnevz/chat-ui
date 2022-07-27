import { getTime } from '../helpers';
import { setActiveFriend } from '../redux/slices/activeConversationSlice';
import { useAppDispatch } from '../redux/store';
import '../styles/base.scss';
import { DisplayUser } from './areas/FriendsArea';
import UserPicture from './UserPicture';

export default function UserAbstract({ user }: { user: DisplayUser }) {

    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(setActiveFriend(user));
    }

    const lastMessage = user.unreadMessages[user.unreadMessages.length - 1];
    return (
        <div onClick={handleClick} className={'user-abstract ' + (user.isConnected ? 'connected' : '') + (user.isActive ? ' active' : '')}>
            <UserPicture userId={user.id ?? -1} />
            <div className="info">
                <strong>{user.firstName} {user.lastName}</strong>
                <p className='last-message'>{(user.unreadMessages.length > 0 && lastMessage?.content) ?? 'No messages'}</p>
            </div>
            {user.unreadMessages.length > 0 &&
                <div className='time-unread-count-container'>
                    <p className='time'>{user.unreadMessages.length > 0 && getTime(lastMessage?.sendTime ?? 0)}</p>
                    {user.unreadMessages.length > 0 &&
                        <p className="unread-count">
                            <span>{user.unreadMessages.length > 9 ? '9+' : user.unreadMessages.length}</span>
                        </p>}
                </div>}
        </div>
    )
}
