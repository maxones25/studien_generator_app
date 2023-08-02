import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { PushService } from './push.service';
import { CreatePushDto } from './dto/createPushDto';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post()
  async createPush(
    @ParticipantId() participantId: string,
    @Body() data: CreatePushDto
  ) {
    return this.pushService.create(participantId, data);
  }

  @Get()
  async sendPush(
    @ParticipantId() participantId: string,
  ) {
    return this.pushService.send(participantId);
  }
}