import { ParticipantNotification } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { ReadNotificationsDto } from './dtos/ReadNotificationsDto';
import { DeleteNotificationsDto } from './dtos/DeleteNotificationsDto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(ParticipantNotification)
    private readonly notificationRepository: Repository<ParticipantNotification>,
  ) {}

  async findByParticipant(participantId: string): Promise<ParticipantNotification[]> {
    return await this.notificationRepository.find({ where: { participantId } });
  }

  async findOneByIdForUser(id: string, participantId: string): Promise<ParticipantNotification> {
    return await this.notificationRepository.findOne({ where: { id, participantId } });
  }

  async findModifiedSince(participantId: string, lastUpdate: Date): Promise<ParticipantNotification[]> {
    return await this.notificationRepository.find({
      where: {
        modifiedAt: MoreThan(lastUpdate),
        participantId: participantId
      }
    });
  }

  async markAllAsRead(
    participantId: string, { readAt }: ReadNotificationsDto, lastUpdated?: string
  ): Promise<void> {
    const updateCriteria: any = {
      participantId,
      readAt: IsNull()
    };
  
    if (lastUpdated !== undefined) {
      const lastUpdatedDate = new Date(lastUpdated)
      updateCriteria.modifiedAt = LessThanOrEqual(lastUpdatedDate);
    }
  
    await this.notificationRepository.update(updateCriteria, {
      readAt: new Date(readAt)
    });
  }

  async deleteAll(participantId: string, lastUpdated?: string): Promise<void> {
    const updateCriteria: any = {
      participantId,
    };
  
    if (lastUpdated !== undefined) {
      const lastUpdatedDate = new Date(lastUpdated)
      updateCriteria.modifiedAt = LessThanOrEqual(lastUpdatedDate);
    }
  
    await this.notificationRepository.delete(updateCriteria);
  }
}
