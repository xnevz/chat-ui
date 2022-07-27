import React, { useContext } from 'react'
import { useAppSelector } from '../../redux/store'

export default function CSRFInput() {
    const userData = useAppSelector(state => state.currentUser);

    return (
        <input type="hidden" name='csrfmiddlewaretoken' value={userData?.csrf_token ?? ''} />
    )
}
