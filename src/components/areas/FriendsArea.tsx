import axios from 'axios';
import { useEffect } from 'react';
import { FriendsResponse } from '../../api/ResponseTypes';
import { FetchState, useAxiosGetPromise } from '../../customHooks';
import { setFriends } from '../../redux/slices/friendsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { User } from '../../types/User';
import UserAbstract from '../UserAbstract';

export interface DisplayUser extends User {
    isActive: boolean
}

export default function UsersArea() {
    const dispatch = useAppDispatch();
    const friends = useAppSelector(state => state.friends.value);
    const activeFriendId = useAppSelector(s => s.activeConversation.activeFriend?.id ?? null);

    const { data: friendsResponse, status: friendsResponseStatus } = useAxiosGetPromise<FriendsResponse>('friends/');

    const displayFriends = friends.map(user => ({
        ...user,
        isActive: activeFriendId == user.id
    } as DisplayUser));

    useEffect(() => {
        if (friendsResponseStatus == FetchState.Success) {
            dispatch(setFriends(friendsResponse?.data.friends ?? []));
        }
    }, [friendsResponseStatus]);

    return (
        <div className="users-container">
            {
                displayFriends.length > 0 ?
                    displayFriends?.map((friend, index) => <UserAbstract key={index} user={friend} />) :
                    <p>No Friends yet :'(</p>
            }</div>
    )
}
