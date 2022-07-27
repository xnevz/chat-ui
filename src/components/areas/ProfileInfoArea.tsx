import { getProfilePicUrlFromId } from "../../api/fetchers";
import { useAppSelector } from "../../redux/store"

export default function ProfileInfoArea({ attachementCount }: { attachementCount: number }) {
    const user = useAppSelector(s => s.activeConversation.activeFriend);

    return user == null ? <p>No user selected</p> : (
        <div className="profile-info">
            <h4>Profile Information</h4>
            <img className="pic" src={getProfilePicUrlFromId(user.id)} alt="" />
            <p className="name">{user.firstName + ' ' + user.lastName}</p>
            {user.isConnected && <p className="active-status">Active now</p>}

            <div className="attachements">
                <span>Attachements</span>
                <p className="attachement-count">
                    <span>{attachementCount > 9 ? '9+' : attachementCount}</span>
                </p>
                <div className="attachements-container">
                    <img src="./pic.webp" alt="" />
                    <img src="./pic.webp" alt="" />
                    <img src="./pic.webp" alt="" />
                    <img src="./pic.webp" alt="" />
                    <img src="./pic.webp" alt="" />
                </div>
            </div>
        </div>
    )
}
