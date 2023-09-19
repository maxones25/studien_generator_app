import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseBoolPipe,
  Inject,
} from '@nestjs/common';
import { GroupsService } from '../application/groups.service';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import {
  GroupGuard,
  GroupQueryDto,
  IsGroupDeletedGuard,
} from '@admin/groups/infrastructure/http';
import {
  GET_GROUPS_BY_STUDY_USE_CASE,
  IGetGroupsByStudyUseCase,
} from '../domain';

@Controller('groups')
@UseGuards(StudyGuard)
export class GroupsQueries {
  constructor(
    private readonly groupsService: GroupsService,
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
    return this.groupsService.getById(groupId);
  }
}
