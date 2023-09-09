import { Inject } from '@shared/modules/core/Inject';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { ChatsRepository } from '../chats.repository';

export class ChatGuard extends RecordGuard {
  constructor(
    @Inject(ChatsRepository)
    service: StudyRelatedDataAccessor,
  ) {
    super(service, 'chat', 'chatId');
  }
}
