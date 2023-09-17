import {
  Query,
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from '../services/schedules.service';
import { AddScheduleDto } from '../dtos/AddScheduleDto';
import { Roles } from '@admin/members/infrastructure/http';
import { UpdateScheduleDto } from '../dtos/UpdateScheduleDto';
import { ScheduleQueryDto } from '../dtos/ScheduleQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { ConfigGuard } from '../guards/config.guard';
import { ConfigQueryDto } from '../dtos/ConfigQueryDto';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class SchedulesCommands {
  constructor(private readonly formSchedulesService: SchedulesService) {}

  @Post('addSchedule')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  async create(
    @Query() { configId }: ConfigQueryDto,
    @Body() body: AddScheduleDto,
  ) {
    return this.formSchedulesService.create(configId, body);
  }

  @Post('updateSchedule')
  @Roles('admin', 'employee')
  async update(
    @Query() { scheduleId }: ScheduleQueryDto,
    @Body() body: UpdateScheduleDto,
  ) {
    return this.formSchedulesService.update(scheduleId, body);
  }

  @Post('removeSchedule')
  @Roles('admin')
  async delete(@Query() { scheduleId }: ScheduleQueryDto) {
    return this.formSchedulesService.delete(scheduleId);
  }
}
