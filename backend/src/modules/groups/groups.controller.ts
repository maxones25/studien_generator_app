import { Body, Controller, Put, Param, Post, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Types } from '../../decorators/type.decorator';
import { GroupDto } from './dtos/groupDto';
import { Roles } from '../../decorators/roles.decorator';

@Controller('studies/:studyId')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Types('director')
  @Roles('admin')
  @Post('groups')
  async create(
    @Param('studyId') studyId: string,
    @Body() createStudyDto: GroupDto,
  ) {
    return this.groupsService.create(studyId, createStudyDto);
  }

  @Types('director')
  @Roles('admin')
  @Put('groups:groudId')
  async update(
    @Param('groupId') groupId: string,
    @Body() updatedGroup: GroupDto,
  ) {
    return this.groupsService.update(groupId, updatedGroup);
  }

  @Types('director')
  @Roles('admin')
  @Delete('groups/:groudId')
  async deleteGroup(@Param('groudId') groudId: string) {
    this.groupsService.delete(groudId);
  }
}
