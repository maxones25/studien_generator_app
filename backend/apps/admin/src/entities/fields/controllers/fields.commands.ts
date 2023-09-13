import {
  Body,
  Controller,
  Query,
  Post,
  UseGuards,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateFieldDto } from '../dtos/CreateFieldDto';
import { UpdateFieldDto } from '../dtos/UpdateFieldDto';
import { Roles } from '@admin/roles/roles.decorator';
import { FieldsService } from '../fields.service';
import { EntityGuard } from '@admin/entities/entities/entity.guard';
import { FieldQueryDto } from '../dtos/FieldQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { Entity } from '@admin/entities/entities/entity.decorator';
import { Entity as EntityEntity } from '@entities';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { AddFieldUseCase } from '../useCases/AddFieldUseCase';
import { IAddFieldUseCase } from '../domain/IAddFieldUseCase';

@Controller('entities')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FieldsCommands {
  constructor(
    @Inject(FieldsService)
    private readonly fieldsService: FieldsService,
    @Inject(AddFieldUseCase)
    private readonly addFieldUseCase: IAddFieldUseCase,
  ) {}

  @Post('addField')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async addField(@Entity() entity: EntityEntity, @Body() data: CreateFieldDto) {
    const id = await this.addFieldUseCase.execute({
      entityId: entity.id,
      data,
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
  @Roles('admin', 'employee')
  async updateField(
    @Query() { fieldId }: FieldQueryDto,
    @Body() body: UpdateFieldDto,
  ) {
    return this.fieldsService.update(fieldId, body);
  }

  @Post('removeField')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  async deleteField(@Query() { fieldId }: FieldQueryDto) {
    return this.fieldsService.delete(fieldId);
  }
}
