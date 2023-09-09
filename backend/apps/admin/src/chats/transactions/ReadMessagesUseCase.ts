import { Transactional } from '@shared/modules/core/Transactional';
import {
  IReadMessagesUseCase,
  ReadMessagesInput,
} from '../domain/IReadMessagesUseCase';
import { IReadReceiptsRepository } from '../domain/IReadReceiptsRepository';
import { Injectable } from '@shared/modules/core/Injectable';
import { Inject } from '@shared/modules/core/Inject';

@Injectable()
export class ReadMessagesUseCase implements IReadMessagesUseCase {
  constructor(
    @Inject("IReadReceiptsRepository")
    private readonly readReceiptsRepository: IReadReceiptsRepository,
  ) {}

  @Transactional()
  execute({ directorId, chatId, readAt }: ReadMessagesInput): Promise<number> {
    return this.readReceiptsRepository.readMessages(directorId, chatId, readAt);
  }
}
