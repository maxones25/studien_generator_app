import { Chat } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { Repository } from 'typeorm';

export class ChatsRepository implements StudyRelatedDataAccessor {
  constructor(
    @InjectRepository(Chat)
    private readonly db: Repository<Chat>,
  ) {}

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOneBy({ id, studyId });
  }

  async getAllMessages(id: string) {
    return this.db.findOne({
      where: {
        id,
      },
      relations: {
        messages: {
          director: true,
          participant: true,
        },
      },
      select: {
        id: true,
        messages: {
          id: true,
          sentAt: true,
          participant: {
            id: true,
            number: true,
          },
          director: {
            id: true,
            firstName: true,
            lastName: true,
          },
          content: true,
        },
      },
      order: {
        messages: {
          sentAt: 'ASC',
        },
      },
    });
  }
}
