import { User } from './auth'
import { ItemWithId, Message } from './message'

export interface Conversation extends ItemWithId {
  recipient: User | User[]
  senderPhoneNumber?: string
  node?: string
  updatedAt: Date
  conversationImageUrl: string
  title: string
  type: string
  unreadedMessages: number
  lastMessage: Message
}
