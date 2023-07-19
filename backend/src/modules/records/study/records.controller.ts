import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Types } from 'src/decorators/type.decorator';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Types('participant')
  @Get('events/:date')
  async create(
    @Param('date') date: Date,
  ) {
    return []
    //return this.recordsService.findByDate(date);
  }
}
