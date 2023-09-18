import { Inject, Controller, Get, UseGuards } from '@nestjs/common';
import { GetAppointmentsUseCase } from '../transactions/GetAppointmentsUseCase';
import { GetGroup } from '../group.decorator';
import { Group } from '@entities/core/group/Group';
import { GroupGuard } from '../guards/group.guard';
import { IsGroupDeletedGuard } from '../guards/IsGroupDeletedGuard';
import { Roles } from '@admin/members/infrastructure/http';

@Controller('groups')
export class AppointmentsQueries {
  constructor(
    @Inject(GetAppointmentsUseCase)
    private readonly getAppointments: GetAppointmentsUseCase,
  ) {}

  @Get('appointments')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  get(@GetGroup() group: Group) {
    return this.getAppointments.execute({
      studyId: group.studyId,
      groupId: group.id,
    });
  }
}
