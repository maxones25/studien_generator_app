import { EntitiesService } from '@admin/entities/application';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { Controller, Get, UseGuards, Query, Inject } from '@nestjs/common';
import {
  EntityGuard,
  EntityQueryDto,
} from '@admin/entities/infrastructure/http';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { Roles } from '@admin/roles/roles.decorator';
import {
  GET_ALL_ENTITIES_USE_CASE,
  GET_ENTITY_BY_ID_USE_CASE,
  IGetAllEntitiesUseCase,
  IGetEntityByIdUseCase,
} from '../domain';

@Controller('entities')
@UseGuards(StudyGuard)
export class EntitiesQueries {
  constructor(
    private readonly entitiesService: EntitiesService,
    @Inject(GET_ALL_ENTITIES_USE_CASE)
    private readonly getAllEntitiesUseCase: IGetAllEntitiesUseCase,
    @Inject(GET_ENTITY_BY_ID_USE_CASE)
    private readonly getEntityByIdUseCase: IGetEntityByIdUseCase,
  ) {}

  @Get('getAll')
  @Roles('admin', 'employee')
  async getAll(@Query() { studyId }: StudyQueryDto) {
    return this.getAllEntitiesUseCase.execute({ studyId });
  }

  @Get('getById')
  @UseGuards(EntityGuard)
  @Roles('admin', 'employee')
  async getById(@Query() { entityId }: EntityQueryDto) {
    return this.getEntityByIdUseCase.execute({ entityId });
  }
}
