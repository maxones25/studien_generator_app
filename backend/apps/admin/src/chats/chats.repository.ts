import { Chat } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository } from '@shared/modules/records/entity.repository';
import { Repository } from 'typeorm';

export class ChatsRepository extends EntityRepository<Chat> {
  constructor(
    @InjectRepository(Chat)
    db: Repository<Chat>,
  ) {
    super(db);
  }

  create() {}

  async getAllMessages(id: string) {
    const result = await this.db.findOne({
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
          participant: {
            number: true,
          },
          directorId: true,
          director: {
            displayName: true,
          },
          content: true,
          sentAt: true,
        },
      },
      order: {
        messages: {
          sentAt: 'ASC',
        },
      },
    });
    const messages = result.messages.map(
      ({ director, participant, content, sentAt, id, directorId }) => {
        return {
          id,
          participantNumber: participant?.number,
          directorId,
          directorName: director?.displayName,
          content,
          sentAt,
        };
      },
    );
    return messages;
  }
}
