import { User } from './auth'
import { Message } from './message'

export interface Conversation {
  id?: string
  recipient: User | User[]
  senderId?: string
  node?: string
  updatedAt: Date
  lastMessage?: Message
}
