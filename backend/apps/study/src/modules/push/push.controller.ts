import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { PushService } from './push.service';
import { CreatePushDto } from './dto/createPushDto';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Get()
  async getPush(
    @ParticipantId() participantId: string,
  ) {
    return this.pushService.get(participantId);
  }

  @Post()
  async createPush(
    @ParticipantId() participantId: string,
    @Body() data: CreatePushDto
  ) {
    return this.pushService.create(participantId, data);
  }

  @Delete()
  async removePush(
    @ParticipantId() participantId: string,
  ) {
    return this.pushService.remove(participantId);
  }

  @Get('/send')
  async sendPush(
    @ParticipantId() participantId: string,
  ) {
    return this.pushService.send(participantId);
  }
}