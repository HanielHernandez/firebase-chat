import { User } from './auth'
import { ItemWithId, Message } from './message'

export interface Conversation extends ItemWithId {
  recipient: User | User[]
  senderId?: string
  node?: string
  updatedAt: Date
  lastMessage?: Message
}
