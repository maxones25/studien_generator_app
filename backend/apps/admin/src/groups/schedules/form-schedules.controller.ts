import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FormSchedulesService } from './form-schedules.service';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { Roles } from '@admin/roles/roles.decorator';
import { FormScheduleGuard } from './form-schedule.guard';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';

@Controller('studies/:studyId/forms/:formId/schedules')
@UseGuards(FormScheduleGuard)
export class FormSchedulesController {
  constructor(private readonly formSchedulesService: FormSchedulesService) {}

  @Post()
  @Roles('admin', 'employee')
  async create(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormScheduleDto,
  ) {
    return this.formSchedulesService.create(formId, body);
  }

  @Get()
  @Roles('admin', 'employee')
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formSchedulesService.getAll(formId);
  }

  @Put(':scheduleId')
  @Roles('admin', 'employee')
  async update(
    @Param('scheduleId', new ValidateIdPipe()) scheduleId: string,
    @Body() body: UpdateFormScheduleDto,
  ) {
    return this.formSchedulesService.update(scheduleId, body);
  }

  @Delete(':scheduleId')
  @Roles('admin')
  async delete(@Param('scheduleId', new ValidateIdPipe()) scheduleId: string) {
    return this.formSchedulesService.delete(scheduleId);
  }
}
