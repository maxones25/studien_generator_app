import {
  Body,
  Controller,
  Param,
  Post,
  Inject,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GroupsService } from '../groups.service';
import { UpdateGroupDto } from '../dtos/UpdateGroupDto';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { CreateGroupDto } from '../dtos/CreateGroupDto';
import { GroupGuard } from '../guards/group.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { GroupQueryDto } from '../dtos/GroupQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';

@Controller('groups')
@UseGuards(StudyGuard)
export class GroupsCommands {
  constructor(
    @Inject(GroupsService)
    private readonly groupsService: GroupsService,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() body: CreateGroupDto,
  ) {
    return this.groupsService.create(studyId, body);
  }

  @Post('changeName')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  async update(
    @Query() { groupId }: GroupQueryDto,
    @Body() { name }: UpdateGroupDto,
  ) {
    return this.groupsService.changeName(groupId, name);
  }

  @Post(':groupId')
  @Roles('admin')
  @UseGuards(GroupGuard)
  async delete(@Param('groupId', new ValidateIdPipe()) groupId: string) {
    return this.groupsService.delete(groupId);
  }
}
