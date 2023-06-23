import { Body, Controller, Put, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Types } from '../../../decorators/type.decorator';
import { GroupDto } from './dtos/groupDto';

@Controller('studies')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Types('director')
  @Post('/:studyId/groups')
  async create(
    @Param('studyId') studyId: string,
    @Body() createStudyDto: GroupDto,
  ) {
    return this.groupsService.create(studyId, createStudyDto);
  }

  @Types('director')
  @Put('/groups:groudId')
  async update(
    @Param('groupId') groupId: string,
    @Body() updateMember: GroupDto,
  ) {
    return this.groupsService.update(groupId, updateMember);
  }
}
