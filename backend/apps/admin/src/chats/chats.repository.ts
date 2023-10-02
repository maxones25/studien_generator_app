import { Chat } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { Repository } from 'typeorm';

export class ChatsRepository implements IGetStudyRelatedDataUseCase {
  constructor(
    @InjectRepository(Chat)
    private readonly db: Repository<Chat>,
  ) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.db.findOneBy({ id, studyId });
  }
}
