import { ParticipantNotification, Task, ChatMessage } from "@entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThan, Not, IsNull, Equal } from "typeorm";

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(ParticipantNotification)
    private notificationsRepository: Repository<ParticipantNotification>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
  ) {}

  async getNewEntriesFromNotifications(lastChecked: Date) {
    return this.notificationsRepository.find({
      where: {
        modifiedAt: MoreThan(lastChecked),
        participant: {
          subscription: Not(IsNull()),
        }
      },
      relations: {
        participant: true
      },
      select: {
        participant: {
          subscription: true
        }
      }
    });
  }

  async getNewEntriesFromTasks(lastChecked: Date) {
    return this.tasksRepository.find({
      where: {
        scheduledAt: Equal(lastChecked),
        participant: {
          subscription: Not(IsNull()),
        }
      },
      relations: {
        participant: true,
        form: true,
      },
      select: {
        participant: {
          subscription: true,
        },
        form: {
          name: true,
        }
      }
    });
  }

  async getNewEntriesFromChat(lastChecked: Date) {
    return this.chatRepository.find({
      where: {
        modifiedAt: MoreThan(lastChecked),
        participantId: IsNull(),
        chat: {
          participant: {
            subscription: Not(IsNull()),
          }
        }
      },
      relations: {
        chat: {
          participant: true,
        },
      },
      select: {
        chat: {
          id: true,
          participant: {
            subscription: true
          }
        }
      }
    });
  }
}