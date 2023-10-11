import {
  Body,
  Controller,
  Query,
  Post,
  UseGuards,
  Inject,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '@admin/studies/members/infrastructure/http';
import { EntityGuard } from '@admin/entities/infrastructure/http/guards/entity.guard';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { Entity } from '@admin/entities/infrastructure/http/decorators/entity.decorator';
import { Entity as EntityEntity } from '@entities';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
import {
  ADD_FIELD_USE_CASE,
  Field,
  IAddFieldUseCase,
  IRemoveFieldUseCase,
  IUpdateFieldUseCase,
  REMOVE_FIELD_USE_CASE,
  UPDATE_FIELD_USE_CASE,
} from '../domain';
import {
  CreateFieldDto,
  ErrorFilter,
  FieldGuard,
  FieldQueryDto,
  UpdateFieldDto,
} from '../infrastructure/http';

@Controller('entities')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FieldsCommands {
  constructor(
    @Inject(ADD_FIELD_USE_CASE)
    private readonly addFieldUseCase: IAddFieldUseCase,
    @Inject(UPDATE_FIELD_USE_CASE)
    private readonly updateFieldUseCase: IUpdateFieldUseCase,
    @Inject(REMOVE_FIELD_USE_CASE)
    private readonly removeFieldUseCase: IRemoveFieldUseCase,
  ) {}

  @Post('addField')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async addField(@Entity() entity: EntityEntity, @Body() data: CreateFieldDto) {
    const id = await this.addFieldUseCase.execute({
      field: new Field({
        entityId: entity.id,
        ...data,
      }),
    });
    return {
      id,
      entity: {
        id: entity.id,
        name: entity.name,
      },
    };
  }

  @Post('updateField')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FieldGuard)
  @Roles('admin', 'employee')
  async updateField(
    @Query() { fieldId }: FieldQueryDto,
    @Body() data: UpdateFieldDto,
  ) {
    return this.updateFieldUseCase.execute({
      field: new Field({ id: fieldId, ...data }),
    });
  }

  @Post('removeField')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FieldGuard)
  @Roles('admin')
  async deleteField(@Query() { fieldId }: FieldQueryDto) {
    return this.removeFieldUseCase.execute({ fieldId });
  }
}
