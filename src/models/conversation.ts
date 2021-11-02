import { User } from './auth'
import { ItemWithId, Message } from './message'

export interface Conversation extends ItemWithId {
  recipient: User | User[]
  senderPhoneNumber?: string
  node?: string
  updatedAt: Date
  title: string
  type: string
  lastMessage?: Message
}
