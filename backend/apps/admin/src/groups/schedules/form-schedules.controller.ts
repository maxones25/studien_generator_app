import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { FormSchedulesService } from './form-schedules.service';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { Roles } from '@admin/roles/roles.decorator';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';
import { GetAllSchedulesQueryParams } from './dtos/GetAllSchedulesQueryParams';
import { ScheduleParamsDto } from './dtos/ScheduleParamsDto';

@Controller('studies/:studyId/schedules')
export class FormSchedulesController {
  constructor(private readonly formSchedulesService: FormSchedulesService) {}

  @Post()
  @Roles('admin', 'employee')
  async create(@Body() body: CreateFormScheduleDto) {
    return this.formSchedulesService.create(body);
  }

  @Get()
  @Roles('admin', 'employee')
  async getAll(@Query() query: GetAllSchedulesQueryParams) {
    return this.formSchedulesService.getByForm(query);
  }

  @Put(':scheduleId')
  @Roles('admin', 'employee')
  async update(
    @Param() { scheduleId }: ScheduleParamsDto,
    @Body() body: UpdateFormScheduleDto,
  ) {
    return this.formSchedulesService.update(scheduleId, body);
  }

  @Delete(':scheduleId')
  @Roles('admin')
  async delete(@Param() { scheduleId }: ScheduleParamsDto) {
    return this.formSchedulesService.delete(scheduleId);
  }
}
