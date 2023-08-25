import { Body, Controller, Get, Query, Post } from '@nestjs/common';
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
    return await this.recordsService.create(participantId, data);
  }

  @Get()
  async getRecords(
    @ParticipantId() participantId: string,
    @Query('lastUpdated') lastUpdated?: string,
    @Query('date') date?: string,
  ) {
    if (date) {
      const parsedDate = new Date(date);
      return await this.recordsService.findRecordedEventsByDate(participantId, parsedDate);
    }
    if (lastUpdated) {
      const parsedDate = new Date(lastUpdated);
      return await this.recordsService.findAll(participantId, parsedDate);
    }
    return await this.recordsService.findAll(participantId);
  }
}
