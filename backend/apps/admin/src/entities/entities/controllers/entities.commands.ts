import {
  Body,
  Controller,
  Query,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateEntityDto } from '../domain/dtos/CreateEntityDto';
import { UpdateEntityDto } from '../domain/dtos/UpdateEntityDto';
import { EntityGuard } from '../guards/entity.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { EntityQueryDto } from '../domain/dtos/EntityQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { Inject } from '@shared/modules/core/Inject';
import { CreateEntityUseCase } from '../useCases/CreateEntityUseCase';
import { ICreateEntityUseCase } from '../domain/ICreateEntityUseCase';
import { IChangeNameUseCase } from '../domain/IChangeNameUseCase';
import { ChangeNameUseCase } from '../useCases/ChangeNameUseCase';
import { DeleteEntityUseCase } from '../useCases/DeleteEntityUseCase';
import { IDeleteEntityUseCase } from '../domain/IDeleteEntityUseCase';

@Controller('entities')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class EntitiesCommands {
  constructor(
    @Inject(CreateEntityUseCase)
    private readonly createEntityUseCase: ICreateEntityUseCase,
    @Inject(ChangeNameUseCase)
    private readonly changeNameUseCase: IChangeNameUseCase,
    @Inject(DeleteEntityUseCase)
    private readonly deleteEntityUseCase: IDeleteEntityUseCase,
  ) {}

  @Post('createEntity')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateEntityDto,
  ) {
    return this.createEntityUseCase.execute({ studyId, data });
  }

  @Post('changeName')
  @Roles('admin', 'employee')
  @HttpCode(HttpStatus.OK)
  @UseGuards(EntityGuard)
  async changeName(
    @Query() { entityId }: EntityQueryDto,
    @Body() { name }: UpdateEntityDto,
  ) {
    return this.changeNameUseCase.execute({ entityId, name });
  }

  @Post('deleteEntity')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(EntityGuard)
  async delete(@Query() { entityId }: EntityQueryDto) {
    return this.deleteEntityUseCase.execute({ entityId });
  }
}
