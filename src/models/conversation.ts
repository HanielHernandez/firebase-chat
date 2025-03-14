import { type User } from './auth'
import { type ItemWithId, type Message } from './message'

export interface Conversation extends ItemWithId {
    recipient: User
    senderPhoneNumber?: string
    node: string
    updatedAt: Date
    conversationImageUrl: string
    title: string
    type: string
    unreadedMessages: number
    lastMessage: Message
}
