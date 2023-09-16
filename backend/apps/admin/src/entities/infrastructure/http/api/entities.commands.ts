import {
  Controller,
  UseGuards,
  UseFilters,
  Inject,
  Query,
  Body,
  HttpStatus,
} from '@nestjs/common';
import {
  CHANGE_ENTITY_NAME_USE_CASE,
  CREATE_ENTITY_USE_CASE,
  DELETE_ENTITY_USE_CASE,
  IChangeEntityNameUseCase,
  ICreateEntityUseCase,
  IDeleteEntityUseCase,
} from '@admin/entities/domain';
import {
  CreateEntityDto,
  EntityGuard,
  EntityQueryDto,
  ErrorFilter,
  UpdateEntityDto,
} from '@admin/entities/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { Command } from '@shared/modules/core';

@Controller('entities')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class EntitiesCommands {
  constructor(
    @Inject(CREATE_ENTITY_USE_CASE)
    private readonly createEntityUseCase: ICreateEntityUseCase,
    @Inject(CHANGE_ENTITY_NAME_USE_CASE)
    private readonly changeEntityNameUseCase: IChangeEntityNameUseCase,
    @Inject(DELETE_ENTITY_USE_CASE)
    private readonly deleteEntityUseCase: IDeleteEntityUseCase,
  ) {}

  @Command('createEntity', HttpStatus.CREATED)
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateEntityDto,
  ) {
    return this.createEntityUseCase.execute({ studyId, data });
  }

  @Command('changeName')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async changeName(
    @Query() { studyId }: StudyQueryDto,
    @Query() { entityId }: EntityQueryDto,
    @Body() { name }: UpdateEntityDto,
  ) {
    return this.changeEntityNameUseCase.execute({ studyId, entityId, name });
  }

  @Command('deleteEntity')
  @UseGuards(EntityGuard)
  @Roles('admin')
  async delete(@Query() { entityId }: EntityQueryDto) {
    return this.deleteEntityUseCase.execute({ entityId });
  }
}
