import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dtos/CreateRecordDto';
import { ParticipantId } from '@study/decorators/participant-id.decorator';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  async saveRecord(
    @ParticipantId() participantId: string,
    @Body() data: CreateRecordDto
  ) {
    return this.recordsService.create(participantId, data);
  }

  @Get()
  async getAll(
    @ParticipantId() participantId: string,
  ) {
    return this.recordsService.findAll(participantId);
  }

  @Get('events/:date')
  async getRecordedEventsByDate(
    @ParticipantId() participantId: string,
    @Param('date') date: Date,
  ) {
    return this.recordsService.findRecordedEventsByDate(participantId, date);
  }
}
