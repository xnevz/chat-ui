import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { FetchState } from '../../customHooks';
import { useAppSelector } from '../../redux/store';

export default function PrivateRoute({ element }: { element: JSX.Element }) {

    const userLoadingState = useAppSelector(state => state.currentUser.userLoadingState);

    return userLoadingState == FetchState.Loading ?
        <p>Loading User data</p>
        : userLoadingState == FetchState.Error ?
            <Navigate to='/login' /> : element;
}
