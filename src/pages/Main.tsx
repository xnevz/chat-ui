import FriendsArea from '../components/areas/FriendsArea'
import MessagingArea from '../components/areas/MessagingArea'
import MessagingHeader from '../components/areas/MessagingHeader'
import ProfileInfoArea from '../components/areas/ProfileInfoArea'
import ProfileHeader from '../components/areas/ProfileHeader'
import TypingArea from '../components/areas/TypingArea'
import Searchbar from '../components/simple/Searchbar'
import { useAppSelector } from '../redux/store'
import ConnectionStateMessage from '../components/messages/ConnectionStateMessage'


export default function Main() {

    const attachementCount = 4;
    const chatConnectionState = useAppSelector(s => s.global.chatConnectionState);

    return (

        <div className={'main-container connection-state-' + chatConnectionState.toString()}>
            <ConnectionStateMessage />
            {/* messages header */}
            <MessagingHeader />

            {/* search bar with profile pic */}
            <div className="search-bar">
                <ProfileHeader />
                <Searchbar placeholder="Search In Messages" />
            </div>

            {/* the sidebar containing friend */}
            <FriendsArea />

            {/* messages area */}
            <MessagingArea />

            {/* typing area */}
            <TypingArea />

            {/* profile info area */}
            <ProfileInfoArea attachementCount={attachementCount} />
        </div>
    )
}
