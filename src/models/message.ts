export interface Message {
  text: string
  date: number
  type: MessageType
  senderId?: string
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
