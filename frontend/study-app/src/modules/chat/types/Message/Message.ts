export type Message = {
  id: string,
  chatId: string,
  participantId?: string,
  directorName?: string,
  sentAt: Date,
  readAt?: Date,
  content: string,
  queued?: boolean,
}

