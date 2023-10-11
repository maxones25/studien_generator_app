import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import {
  Controller,
  Get,
  UseGuards,
  Query,
  Inject,
  UseFilters,
} from '@nestjs/common';
import {
  EntityGuard,
  EntityQueryDto,
  ErrorFilter,
} from '@admin/entities/infrastructure/http';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import { Roles } from '@admin/studies/members/infrastructure/http';
import {
  GET_ALL_ENTITIES_USE_CASE,
  GET_ENTITY_BY_ID_USE_CASE,
  IGetAllEntitiesUseCase,
  IGetEntityByIdUseCase,
} from '../domain';

@Controller('entities')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard)
export class EntitiesQueries {
  constructor(
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
