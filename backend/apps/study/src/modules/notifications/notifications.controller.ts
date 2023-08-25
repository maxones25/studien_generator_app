import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { ReadNotificationsDto } from './dtos/ReadNotificationsDto';
import { DeleteNotificationsDto } from './dtos/DeleteNotificationsDto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(
    @ParticipantId() participantId: string,
    @Query('lastUpdated') lastUpdated?: string,
  ) {
    if (lastUpdated) {
      return await this.notificationsService.findModifiedSince(participantId, new Date(lastUpdated));
    }
    return await this.notificationsService.findByParticipant(participantId);
  }

  @Put()
  async markAllAsRead(
    @ParticipantId() participantId: string,
    @Body() readNotificationsDto: ReadNotificationsDto,
    @Query('lastUpdated') lastUpdated?: string,
  ) {
    return this.notificationsService.markAllAsRead(participantId, readNotificationsDto, lastUpdated);
  }

  @Delete()
  async deleteAll(
    @ParticipantId() participantId: string,
    @Query('lastUpdated') lastUpdated?: string,
  ) {
    return this.notificationsService.deleteAll(participantId, lastUpdated);
  }
}
