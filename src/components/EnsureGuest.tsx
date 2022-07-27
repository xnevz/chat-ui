import { Navigate } from 'react-router-dom';
import { FetchState } from '../customHooks';
import { useAppSelector } from '../redux/store';

export default function EnsureGuest({ children }: { children: JSX.Element }) {
    const userLoadingState = useAppSelector(state => state.currentUser.userLoadingState);

    return (
        userLoadingState == FetchState.Error ?
            children : userLoadingState == FetchState.Loading ?
                <p>Loading ...</p> : <Navigate to='/' />
    );
}
