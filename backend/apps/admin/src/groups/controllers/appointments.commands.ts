import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../transactions/CreateAppointmentUseCase';
import { GroupQueryDto } from '../dtos/GroupQueryDto';
import { GroupGuard } from '../guards/group.guard';
import { IsGroupDeletedGuard } from '../guards/IsGroupDeletedGuard';

@Controller('groups')
export class AppointmentsCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  create(
    @Query() { groupId }: GroupQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ groupId, data });
  }
}
