import { getProfilePicUrlFromId } from '../api/fetchers'

export default function UserPicture({ userId, small, superSmall }: { userId: number, small?: boolean, superSmall?: boolean }) {
    return (
        <div style={{ opacity: userId < 0 ? 0 : 1 }} className={'profile-pic-container' + (small ? ' small' : (superSmall ? ' super-small' : ''))}>
            <img src={userId > 0 ? getProfilePicUrlFromId(userId) : ''} alt="" className="profile-pic" />
        </div>
    )
}
