import { AddScheduleDto } from '@admin/groups/infrastructure/http/dtos/AddScheduleDto';
import { Roles } from '@admin/members/infrastructure/http';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import {
  Query,
  Body,
  Controller,
  Post,
  UseGuards,
  Inject,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ADD_SCHEDULE_USE_CASE,
  IAddScheduleUseCase,
  IRemoveScheduleUseCase,
  IUpdateScheduleUseCase,
  REMOVE_SCHEDULE_USE_CASE,
  UPDATE_SCHEDULE_USE_CASE,
} from '../domain';
import {
  ScheduleGuard,
  ErrorFilter,
  FormConfigGuard,
  ScheduleQueryDto,
  UpdateScheduleDto,
  ConfigQueryDto,
} from '@admin/groups/infrastructure/http';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class SchedulesCommands {
  constructor(
    @Inject(ADD_SCHEDULE_USE_CASE)
    private readonly addScheduleUseCase: IAddScheduleUseCase,
    @Inject(UPDATE_SCHEDULE_USE_CASE)
    private readonly updateScheduleUseCase: IUpdateScheduleUseCase,
    @Inject(REMOVE_SCHEDULE_USE_CASE)
    private readonly removeScheduleUseCase: IRemoveScheduleUseCase,
  ) {}

  @Post('addSchedule')
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  async create(
    @Query() { configId }: ConfigQueryDto,
    @Body() data: AddScheduleDto,
  ) {
    return this.addScheduleUseCase.execute({ formConfigId: configId, data });
  }

  @Post('updateSchedule')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ScheduleGuard)
  @Roles('admin', 'employee')
  async update(
    @Query() { scheduleId }: ScheduleQueryDto,
    @Body() data: UpdateScheduleDto,
  ) {
    return this.updateScheduleUseCase.execute({ scheduleId, data });
  }

  @Post('removeSchedule')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ScheduleGuard)
  @Roles('admin')
  async delete(@Query() { scheduleId }: ScheduleQueryDto) {
    return this.removeScheduleUseCase.execute({ scheduleId });
  }
}
