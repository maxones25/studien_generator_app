import {
  Query,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { ScheduleQueryDto } from '@admin/groups/infrastructure/http';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class SchedulesCommands {
  constructor(private readonly formSchedulesService: SchedulesService) {}

  @Post('removeSchedule')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  async delete(@Query() { scheduleId }: ScheduleQueryDto) {
    return this.formSchedulesService.delete(scheduleId);
  }
}
