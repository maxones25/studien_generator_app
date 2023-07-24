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
import { UpdateGroupDto } from './dtos/UpdateGroupDto';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { GroupGuard } from './guards/group.guard';
import { Roles } from '@admin/modules/roles/roles.decorator';

@Controller('studies/:studyId/groups')
@UseGuards(GroupGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @Roles('admin', 'employee')
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() createStudyDto: CreateGroupDto,
  ) {
    return this.groupsService.create(studyId, createStudyDto);
  }

  @Get()
  @Roles('admin', 'employee')
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.groupsService.getByStudy(studyId);
  }

  @Put(':groupId')
  async update(
    @Param('groupId', new ValidateIdPipe()) groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(groupId, updateGroupDto);
  }

  @Roles('admin')
  @Delete(':groupId')
  async delete(@Param('groupId', new ValidateIdPipe()) groupId: string) {
    return this.groupsService.delete(groupId);
  }
}
