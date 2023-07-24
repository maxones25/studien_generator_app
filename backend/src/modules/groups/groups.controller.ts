import {
  Body,
  Controller,
  Put,
  Param,
  Post,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Types } from '../../decorators/type.decorator';
import { UpdateGroupDto } from './dtos/UpdateGroupDto';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../src/pipes/validate-id.pipe';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { GroupGuard } from './guards/group.guard';

@Controller('studies/:studyId/groups')
@UseGuards(GroupGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Types('director')
  @Roles('admin')
  @Post()
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() createStudyDto: CreateGroupDto,
  ) {
    return this.groupsService.create(studyId, createStudyDto);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async findGroupsByStudies(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
  ) {
    return this.groupsService.getByStudy(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Put(':groupId')
  async update(
    @Param('groupId', new ValidateIdPipe()) groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(groupId, updateGroupDto);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':groupId')
  async deleteGroup(@Param('groupId', new ValidateIdPipe()) groupId: string) {
    return this.groupsService.delete(groupId);
  }
}
