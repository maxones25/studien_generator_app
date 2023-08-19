export type Message = {
  id: string,
  chatId: string,
  participantId?: string,
  directorName?: string,
  sendAt: Date,
  readAt?: Date,
  content: string,
}

