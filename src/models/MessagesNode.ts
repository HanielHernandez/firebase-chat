import { type ItemWithId, type Message } from './message'

export interface MessageNode extends ItemWithId {
  id?: string | number
  messages: Message[]
}
