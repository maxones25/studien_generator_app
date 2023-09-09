export interface IReadReceiptsRepository {
  readMessages(directorId: string, chatId: string, readAt: Date): Promise<number>;
}
