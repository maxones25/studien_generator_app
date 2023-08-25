export type Message = {
  id: string,
  participantNumber?: number,
  directorId?: string,
  directorName?: string,
  content: string,
  sentAt: Date
}