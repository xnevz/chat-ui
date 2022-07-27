export function SentIcon() {
    return <svg className="status-icon" viewBox="0 0 25 25">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>;
}

export function DeliveredIcon() {
    return <svg className="status-icon" viewBox="0 0 35 25">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        <path style={{ transform: 'translateX(10px)' }} d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>;
}