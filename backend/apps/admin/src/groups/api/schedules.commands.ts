import { AddScheduleDto } from '@admin/forms/configs/dtos/AddScheduleDto';
import { ConfigQueryDto } from '@admin/forms/configs/dtos/ConfigQueryDto';
import { ConfigGuard } from '@admin/forms/configs/guards/config.guard';
import { Roles } from '@admin/members/infrastructure/http';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import {
  Query,
  Body,
  Controller,
  Post,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ADD_SCHEDULE_USE_CASE, IAddScheduleUseCase } from '../domain';
import { IAddFieldUseCase } from '@admin/entities/domain';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class SchedulesCommands {
  constructor(
    @Inject(ADD_SCHEDULE_USE_CASE)
    private readonly addScheduleUseCase: IAddScheduleUseCase,
  ) {}

  @Post('addSchedule')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  async create(
    @Query() { configId }: ConfigQueryDto,
    @Body() data: AddScheduleDto,
  ) {
    return this.addScheduleUseCase.execute({ formConfigId: configId, data });
  }

  // @Post('updateSchedule')
  // @Roles('admin', 'employee')
  // async update(
  //   @Query() { scheduleId }: ScheduleQueryDto,
  //   @Body() body: UpdateScheduleDto,
  // ) {
  //   return this.formSchedulesService.update(scheduleId, body);
  // }

  // @Post('removeSchedule')
  // @Roles('admin')
  // async delete(@Query() { scheduleId }: ScheduleQueryDto) {
  //   return this.formSchedulesService.delete(scheduleId);
  // }
}
