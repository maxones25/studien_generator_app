import { ChatMessageReceipt } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReadReceiptsRepository } from './domain/IReadReceiptsRepository';

export class ReadReceiptsRepository implements IReadReceiptsRepository {
  constructor(
    @InjectRepository(ChatMessageReceipt)
    private readonly db: Repository<ChatMessageReceipt>,
  ) {}

  async readMessages(
    directorId: string,
    chatId: string,
    readAt: Date,
  ): Promise<number> {
    const receiptsToUpdate = await this.db
      .createQueryBuilder('receipt')
      .innerJoinAndSelect('receipt.message', 'message')
      .where('receipt.directorId = :directorId', { directorId })
      .andWhere('message.chatId = :chatId', { chatId })
      .andWhere('receipt.readAt IS NULL')
      .getMany();

    for (let receipt of receiptsToUpdate) {
      receipt.readAt = readAt;
    }

    await this.db.save(receiptsToUpdate);

    return receiptsToUpdate.length;
  }
}
