import {
  Body,
  Controller,
  Query,
  Post,
  UseGuards,
  Inject,
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

@Controller('entities')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FieldsCommands {
  constructor(
    @Inject(FieldsService)
    private readonly fieldsService: FieldsService,
  ) {}

  @Post('addField')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async addField(@Entity() entity: EntityEntity, @Body() body: CreateFieldDto) {
    const id = await this.fieldsService.add(entity.id, body);
    return {
      id,
      entity: {
        id: entity.id,
        name: entity.name,
      },
    };
  }

  @Post('updateField')
  @Roles('admin', 'employee')
  async updateField(
    @Query() { fieldId }: FieldQueryDto,
    @Body() body: UpdateFieldDto,
  ) {
    return this.fieldsService.update(fieldId, body);
  }

  @Post('removeField')
  @Roles('admin')
  async deleteField(@Query() { fieldId }: FieldQueryDto) {
    return this.fieldsService.delete(fieldId);
  }
}
