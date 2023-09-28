import { Roles } from '@admin/members/infrastructure/http';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import {
  ErrorFilter,
  GetByGroupQueryDto,
  GroupGuard,
  GroupQueryDto,
} from '@admin/groups/infrastructure/http';
import {
  GET_FORM_CONFIGS_USE_CASE,
  IGetFormConfigsUseCase,
  GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE,
  IGetAvailableFormsByGroupUseCase,
} from '../domain';

@Controller('groups')
@UseFilters(ErrorFilter)
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
