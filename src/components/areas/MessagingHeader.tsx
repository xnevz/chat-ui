import React from 'react';
import { getProfilePicUrlFromId } from '../../api/fetchers';
import { useAppSelector } from '../../redux/store';
import UserPicture from '../UserPicture';

export default function MessagingHeader() {
    const user = useAppSelector(s => s.activeConversation.activeFriend);

    return (
        <div className="messages-header">
            {(user?.id ?? -1 != -1) && <UserPicture userId={user?.id ?? -1} />}
            <div className="info">
                <p>{user ? `${user.firstName} ${user.lastName}` : 'Select a user'}</p>
                {user && user.isConnected && <p className="active-status">Active Now</p>}
            </div>
        </div>
    )
}
