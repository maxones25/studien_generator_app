export type Chat = {
  id: string,
  participantId: string,
  participantNumber: number,
  newestMessage: NewestMessage,
  unread: number,
}

export type NewestMessage = {
  sentAt: Date,
  content: string,
}