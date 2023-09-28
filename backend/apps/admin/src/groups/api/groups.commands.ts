import {
  Body,
  Controller,
  Post,
  Inject,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { DeleteDto } from '@shared/modules/records/DeleteDto';
import {
  CreateGroupDto,
  ErrorFilter,
  GroupGuard,
  GroupQueryDto,
  IsGroupDeletedGuard,
  UpdateGroupDto,
} from '@admin/groups/infrastructure/http';
import {
  CHANGE_GROUP_NAME_USE_CASE,
  CREATE_GROUP_USE_CASE,
  DELETE_GROUP_USE_CASE,
  IChangeGroupNameUseCase,
  ICreateGroupUseCase,
  IDeleteGroupUseCase,
  IRestoreGroupUseCase,
  RESTORE_GROUP_USE_CASE,
} from '../domain';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class GroupsCommands {
  constructor(
    @Inject(DELETE_GROUP_USE_CASE)
    private readonly deleteGroupUseCase: IDeleteGroupUseCase,
    @Inject(CREATE_GROUP_USE_CASE)
    private readonly createGroupUseCase: ICreateGroupUseCase,
    @Inject(CHANGE_GROUP_NAME_USE_CASE)
    private readonly changeGroupNameUseCase: IChangeGroupNameUseCase,
    @Inject(RESTORE_GROUP_USE_CASE)
    private readonly restoreGroupUseCase: IRestoreGroupUseCase,
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
    return this.changeGroupNameUseCase.execute({ groupId, name });
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(GroupGuard)
  async delete(
    @Query() { groupId }: GroupQueryDto,
    @Body() { hardDelete, deleteRelated }: DeleteDto,
  ) {
    return this.deleteGroupUseCase.execute({
      groupId,
      hardDelete,
      deleteRelated,
    });
  }

  @Post('restore')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(GroupGuard)
  async restore(@Query() { groupId }: GroupQueryDto) {
    return this.restoreGroupUseCase.execute({ groupId });
  }
}
