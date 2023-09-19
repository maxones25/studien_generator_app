import { Inject, Controller, Get, UseGuards } from '@nestjs/common';
import { GetGroup } from '../infrastructure/http/decorators/group.decorator';
import { Group } from '@entities/core/group/Group';
import { Roles } from '@admin/members/infrastructure/http';
import { GroupGuard, IsGroupDeletedGuard } from '../infrastructure/http';
import {
  GET_GROUP_APPOINTMENTS_USE_CASE,
  IGetGroupAppointmentsUseCase,
} from '../domain';

@Controller('groups')
export class AppointmentsQueries {
  constructor(
    @Inject(GET_GROUP_APPOINTMENTS_USE_CASE)
    private readonly getGroupAppointmentsUseCase: IGetGroupAppointmentsUseCase,
  ) {}

  @Get('appointments')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  get(@GetGroup() group: Group) {
    return this.getGroupAppointmentsUseCase.execute({
      studyId: group.studyId,
      groupId: group.id,
    });
  }
}
