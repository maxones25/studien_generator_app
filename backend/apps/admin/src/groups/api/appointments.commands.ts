import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../application/useCases/CreateAppointmentUseCase';
import {
  GroupQueryDto,
  GroupGuard,
  IsGroupDeletedGuard,
} from '@admin/groups/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { Roles } from '@admin/members/infrastructure/http';

@Controller('groups')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class AppointmentsCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  create(
    @Query() { groupId }: GroupQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ groupId, data });
  }
}
