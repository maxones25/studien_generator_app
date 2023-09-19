import { Inject, Controller, Get, UseGuards } from '@nestjs/common';
import { GetGroup } from '../infrastructure/http/decorators/group.decorator';
import { Group } from '@entities/core/group/Group';
import { Roles } from '@admin/members/infrastructure/http';
import { GetAppointmentsUseCase } from '../application';
import { GroupGuard, IsGroupDeletedGuard } from '../infrastructure/http';

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
