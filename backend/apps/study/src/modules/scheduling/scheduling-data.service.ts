import { ParticipantNotification, Task, ChatMessage, Appointment } from "@entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import datetime from "@shared/modules/datetime/datetime";
import { addMinutes } from "date-and-time";
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
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async getNewEntriesFromTasks(lastChecked: Date) {
    const preNotificationTimeMinutes = 15;
    const preNotificationDate = addMinutes(lastChecked, preNotificationTimeMinutes );
    return this.tasksRepository.find({
      where: [{
        scheduledAt: Equal(lastChecked),
        participant: {
          subscription: Not(IsNull()),
        },
        completedAt: IsNull(),
        deletedAt: IsNull(),
      },{
        scheduledAt: Equal(preNotificationDate),
        participant: {
          subscription: Not(IsNull()),
        },
        completedAt: IsNull(),
        deletedAt: IsNull(),
      }
    ],
      relations: {
        participant: true,
        form: true,
      },
      select: {
        participant: {
          subscription: true,
          id: true
        },
        form: {
          name: true,
        }
      }
    });
  }

  async getNewEntriesFromAppointments(lastChecked: Date) {
    const preNotificationTimeMinutes = 15;
    const preNotificationDate = addMinutes(lastChecked, preNotificationTimeMinutes );
    return this.appointmentsRepository.find({
      where: [{
          startDate: Equal(datetime.formatDate(lastChecked)),
          startTime: Equal(datetime.formatTime(lastChecked)),
          participant: {
            subscription: Not(IsNull()),
          },
          deletedAt: IsNull(),
        },{
          startDate: Equal(datetime.formatDate(preNotificationDate)),
          startTime: Equal(datetime.formatTime(preNotificationDate)),
          participant: {
            subscription: Not(IsNull()),
          },
          deletedAt: IsNull(),
        }
      ],
      relations: {
        participant: true,
      },
      select: {
        participant: {
          subscription: true,
          id: true,
        },
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
            subscription: true,
            id: true
          }
        }
      }
    });
  }
}