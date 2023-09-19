import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GroupQueryDto,
  GroupGuard,
  IsGroupDeletedGuard,
} from '@admin/groups/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { Roles } from '@admin/members/infrastructure/http';
import {
  CREATE_GROUP_APPOINTMENT_USE_CASE,
  ICreateGroupAppointmentUseCase,
} from '../domain';

@Controller('groups')
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
