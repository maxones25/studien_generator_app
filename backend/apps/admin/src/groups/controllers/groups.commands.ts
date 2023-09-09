import {
  Body,
  Controller,
  Post,
  Inject,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupsService } from '../groups.service';
import { UpdateGroupDto } from '../dtos/UpdateGroupDto';
import { CreateGroupDto } from '../dtos/CreateGroupDto';
import { GroupGuard } from '../guards/group.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { GroupQueryDto } from '../dtos/GroupQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import { IsGroupDeletedGuard } from '../guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from '../transactions/DeleteGroupTransaction';

@Controller('groups')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class GroupsCommands {
  constructor(
    @Inject(GroupsService)
    private readonly groupsService: GroupsService,
    @Inject(DeleteGroupTransaction)
    private readonly deleteGroup: DeleteGroupTransaction,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateGroupDto,
  ) {
    return this.groupsService.create(studyId, body);
  }

  @Post('changeName')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard)
  async update(
    @Query() { groupId }: GroupQueryDto,
    @Body() { name }: UpdateGroupDto,
  ) {
    return this.groupsService.changeName(groupId, name);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(GroupGuard)
  async delete(
    @Query() { groupId }: GroupQueryDto,
    @Body() { hardDelete, deleteRelated }: DeleteDto,
  ) {
    return this.deleteGroup.run({ groupId, hardDelete, deleteRelated });
  }

  @Post('restore')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(GroupGuard)
  async restore(@Query() { groupId }: GroupQueryDto) {
    return this.groupsService.restore(groupId);
  }
}
