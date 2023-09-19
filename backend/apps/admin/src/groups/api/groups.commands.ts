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
import { GroupsService } from '../application/groups.service';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import {
  CreateGroupDto,
  GroupGuard,
  GroupQueryDto,
  IsGroupDeletedGuard,
  UpdateGroupDto,
} from '@admin/groups/infrastructure/http';
import { DeleteGroupTransaction } from '../application';
import { CREATE_GROUP_USE_CASE, ICreateGroupUseCase } from '../domain';

@Controller('groups')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class GroupsCommands {
  constructor(
    @Inject(GroupsService)
    private readonly groupsService: GroupsService,
    @Inject(DeleteGroupTransaction)
    private readonly deleteGroup: DeleteGroupTransaction,
    @Inject(CREATE_GROUP_USE_CASE)
    private readonly createGroupUseCase: ICreateGroupUseCase,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateGroupDto,
  ) {
    return this.createGroupUseCase.execute({ data: { studyId, ...body } });
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
