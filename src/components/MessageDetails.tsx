import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { DOT, getTime } from "../helpers";
import { DisplayMessage } from "./areas/MessagingArea";
import UserPicture from "./UserPicture";
import '../styles/messageDetails.scss';
import { DeliveredIcon, SentIcon } from "../images/messageStatusIcons";
import { MessageStatus } from "../types/Message";

/**
 * Gets the appropriate corner radius according to the current message position
 * @param m Message to use
 * @returns The appropriate corner radius according to the current message position
 */
function borderRadiusFromMessage(m: DisplayMessage) {

    const borderTopLeftRadius = m.fromMe ? 15 : (m.firstInGroup ? 15 : 2);
    const borderTopRightRadius = !m.fromMe ? 15 : (m.firstInGroup ? 15 : 2);

    const borderBottomLeftRadius = m.fromMe ? 15 : (m.lastInGroup ? 15 : 2);
    const borderBottomRightRadius = !m.fromMe ? 15 : (m.lastInGroup ? 15 : 2);

    return {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
    }
}

export default function MessageDetails({ message, animOrder }: { message: DisplayMessage, animOrder: number }) {
    // reference to the containers for animations
    const containerRef = useRef(null);

    // entry animation
    useEffect(() => {
        // define the animation (for cleanup)
        let anim: gsap.core.Tween | null = null;

        // ensure the ref is ready
        if (containerRef.current) {
            // animate the container and store the animation
            anim = gsap.to(containerRef.current, {
                delay: 0.03 * animOrder,
                opacity: 1
            });
        }

        // cleanup method
        return () => {
            // clean the animation when unmounting
            if (anim != null)
                anim.kill();
        }

    }, []);

    return (
        <div ref={containerRef} className={'message-details' + (message.fromMe ? ' right-side' : '') + (message.senderActive ? ' connected' : '')}>

            {/* user picture */}
            <UserPicture small userId={message.lastInGroup ? message.senderId : -1} />

            <div className="message-content">

                {/* message content */}
                <p style={{ ...borderRadiusFromMessage(message) }} className="content">{message.content}</p>

                {/* message status */}
                {message.lastInGroup && (
                    message.status == MessageStatus.Sent ? <SentIcon /> :
                        message.status == MessageStatus.Delivered ? <DeliveredIcon /> :
                            message.status == MessageStatus.Pending ? null :
                                <UserPicture superSmall userId={message.senderId} />
                )}

            </div>

            {/* time */}
            {message.lastInGroup && <p className="time">{getTime(message.sendTime)}{message.seenTime != null ? ` ${DOT} seen` : ''}</p>}
        </div>
    )
}
