import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseBoolPipe,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import {
  ErrorFilter,
  GroupGuard,
  GroupQueryDto,
  IsGroupDeletedGuard,
} from '@admin/groups/infrastructure/http';
import {
  GET_GROUPS_BY_STUDY_USE_CASE,
  GET_GROUP_BY_ID_USE_CASE,
  IGetGroupByIdUseCase,
  IGetGroupsByStudyUseCase,
} from '../domain';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard)
export class GroupsQueries {
  constructor(
    @Inject(GET_GROUP_BY_ID_USE_CASE)
    private readonly getGroupByIdUseCase: IGetGroupByIdUseCase,
    @Inject(GET_GROUPS_BY_STUDY_USE_CASE)
    private readonly getGroupsByStudyUseCase: IGetGroupsByStudyUseCase,
  ) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getAll(
    @Query() { studyId }: StudyQueryDto,
    @Query('deleted', ParseBoolPipe) deleted: boolean,
  ) {
    return this.getGroupsByStudyUseCase.execute({ studyId, deleted });
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  async getById(@Query() { groupId }: GroupQueryDto) {
    return this.getGroupByIdUseCase.execute({ groupId });
  }
}
