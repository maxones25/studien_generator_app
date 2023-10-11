import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import {
  GroupQueryDto,
  GroupGuard,
  IsGroupDeletedGuard,
  ErrorFilter,
} from '@admin/groups/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { CreateAppointmentDto, IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
import { Roles } from '@admin/studies/members/infrastructure/http';
import {
  CREATE_GROUP_APPOINTMENT_USE_CASE,
  ICreateGroupAppointmentUseCase,
} from '../domain';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class AppointmentsCommands {
  constructor(
    @Inject(CREATE_GROUP_APPOINTMENT_USE_CASE)
    private readonly createGroupAppointmentUseCase: ICreateGroupAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  create(
    @Query() { groupId }: GroupQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createGroupAppointmentUseCase.execute({
      data: { groupId, ...data },
    });
  }
}
