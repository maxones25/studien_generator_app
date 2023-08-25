import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { GroupsService } from '../groups.service';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupGuard } from '../guards/group.guard';
import { GroupQueryDto } from '../dtos/GroupQueryDto';

@Controller('groups')
@UseGuards(StudyGuard)
export class GroupsQueries {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getAll(@Query() { studyId }: StudyQueryDto) {
    return this.groupsService.getByStudy(studyId);
  }

  @Get(':getById')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  async getById(@Query() { groupId }: GroupQueryDto) {
    return this.groupsService.getById(groupId);
  }
}
