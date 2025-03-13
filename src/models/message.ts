export interface ItemWithId {
  id?: string | number
}

export interface Message extends ItemWithId {
  text: string
  date: number
  senderImageUrl: string
  type: MessageType
  senderId: string
  status: string
}

export enum MessageType {
  'SYSTEM',
  'SMS',
  'MMS'
}

export enum MessagesSystemText {
  CONVERSATION_CREATED = 'CONVERSATION_CREATED'
}
