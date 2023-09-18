import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { GroupsService } from '../groups.service';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupGuard } from '../guards/group.guard';
import { GroupQueryDto } from '../dtos/GroupQueryDto';
import { IsGroupDeletedGuard } from '../guards/IsGroupDeletedGuard';

@Controller('groups')
@UseGuards(StudyGuard)
export class GroupsQueries {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getAll(
    @Query() { studyId }: StudyQueryDto,
    @Query('deleted', ParseBoolPipe) deleted: boolean,
  ) {
    return this.groupsService.getByStudy(studyId, deleted);
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  async getById(@Query() { groupId }: GroupQueryDto) {
    return this.groupsService.getById(groupId);
  }
}
