import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Types } from '../../../decorators/type.decorator';
import { CreateRecordDto } from './dtos/createRecordDto';
import { ParticipantId } from '../../../decorators/participant-id.decorator';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Types('participant')
  @Post()
  async saveRecord(
    @ParticipantId() participantId: string,
    @Body() data: CreateRecordDto
  ) {
    return this.recordsService.create(participantId, data);
  }

  @Types('participant')
  @Get('events/:date')
  async getRecordedEventsByDate(
    @ParticipantId() participantId: string,
    @Param('date') date: Date,
  ) {
    return this.recordsService.findRecordedEventsByDate(participantId, date);
  }
}
