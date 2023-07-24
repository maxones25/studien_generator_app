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
    @Body() body: CreateGroupDto,
  ) {
    return this.groupsService.create(studyId, body);
  }

  @Get()
  @Roles('admin', 'employee')
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.groupsService.getByStudy(studyId);
  }

  @Get(':groupId')
  @Roles('admin', 'employee')
  async getById(@Param('groupId', new ValidateIdPipe()) groupId: string) {
    return this.groupsService.getById(groupId);
  }

  @Put(':groupId')
  @Roles('admin', 'employee')
  async update(
    @Param('groupId', new ValidateIdPipe()) groupId: string,
    @Body() body: UpdateGroupDto,
  ) {
    return this.groupsService.update(groupId, body);
  }

  @Delete(':groupId')
  @Roles('admin')
  async delete(@Param('groupId', new ValidateIdPipe()) groupId: string) {
    return this.groupsService.delete(groupId);
  }
}
