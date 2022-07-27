import React from 'react'

export enum MessageType {
    Warning = 'warning',
    Success = 'success',
    Danger = 'danger'
}
export default function Message({ content, type }: { content: string, type: MessageType }) {
    return (
        <div className={'message bg-' + type}>{content}</div>
    )
}
