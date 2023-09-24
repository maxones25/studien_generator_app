import { Roles } from '@admin/members/infrastructure/http';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupQueryDto } from '@admin/groups/infrastructure/http';
import { GetByGroupQueryDto } from '@admin/forms/configs/dtos/GetByGroupQueryDto';
import {
  GET_FORM_CONFIGS_USE_CASE,
  IGetFormConfigsUseCase,
  GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE,
  IGetAvailableFormsByGroupUseCase,
} from '../domain';

@Controller('groups')
@UseGuards(StudyGuard)
export class FormConfigsQueries {
  constructor(
    @Inject(GET_FORM_CONFIGS_USE_CASE)
    private readonly getFormConfigsUseCase: IGetFormConfigsUseCase,
    @Inject(GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE)
    private readonly getAvailableFormsByGroupUseCase: IGetAvailableFormsByGroupUseCase,
  ) {}

  @Get('getFormConfigs')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  getFormsByGroup(
    @Query() { groupId }: GroupQueryDto,
    @Query() { type, isActive }: GetByGroupQueryDto,
  ) {
    return this.getFormConfigsUseCase.execute({ groupId, type, isActive });
  }

  @Get('getAvailableForms')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  getNonGroup(
    @Query() { studyId }: StudyQueryDto,
    @Query() { groupId }: GroupQueryDto,
  ) {
    return this.getAvailableFormsByGroupUseCase.execute({ studyId, groupId });
  }
}
