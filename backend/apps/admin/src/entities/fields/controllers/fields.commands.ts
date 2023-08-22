import {
  Body,
  Controller,
  Query,
  Post,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { CreateEntityFieldDto } from '../dtos/CreateEntityFieldDto';
import { UpdateEntityFieldDto } from '../dtos/UpdateEntityFieldDto';
import { Roles } from '@admin/roles/roles.decorator';
import { FieldsService } from '../fields.service';
import { EntityQueryDto } from '@admin/entities/entities/dtos/EntityQueryDto';
import { EntityGuard } from '@admin/entities/entities/entity.guard';
import { FieldQueryDto } from '../dtos/FieldQueryDto';

@Controller('entities')
export class FieldsCommands {
  constructor(
    @Inject(FieldsService)
    private readonly fieldsService: FieldsService,
  ) {}

  @Post('addField')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async addField(
    @Query() { entityId }: EntityQueryDto,
    @Body() body: CreateEntityFieldDto,
  ) {
    return this.fieldsService.add(entityId, body);
  }

  @Post('updateField')
  @Roles('admin', 'employee')
  async updateField(
    @Query() { fieldId }: FieldQueryDto,
    @Body() body: UpdateEntityFieldDto,
  ) {
    return this.fieldsService.update(fieldId, body);
  }

  @Post('removeField')
  @Roles('admin')
  async deleteField(@Query() { fieldId }: FieldQueryDto) {
    return this.fieldsService.delete(fieldId);
  }
}
