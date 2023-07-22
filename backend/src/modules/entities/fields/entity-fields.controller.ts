import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Types } from '../../../decorators/type.decorator';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { Roles } from '../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../pipes/validate-id.pipe';
import { EntityFieldsService } from './entity-fields.service';
import { EntityFieldGuard } from './guards/entity-field.guard';

@Controller('studies/:studyId/entities/:entityId/fields')
@UseGuards(EntityFieldGuard)
export class EntityFieldsController {
  constructor(private readonly entityFieldsService: EntityFieldsService) {}

  @Post()
  async addField(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() body: CreateEntityFieldDto,
  ) {
    return this.entityFieldsService.add(entityId, body);
  }

  @Get()
  async getFields(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entityFieldsService.getAll(entityId);
  }

  @Put(':fieldId')
  async updateField(
    @Param('fieldId', new ValidateIdPipe()) fieldId: string,
    @Body() body: UpdateEntityFieldDto,
  ) {
    return this.entityFieldsService.update(fieldId, body);
  }

  @Roles('admin')
  @Delete(':fieldId')
  async deleteField(@Param('fieldId', new ValidateIdPipe()) fieldId: string) {
    return this.entityFieldsService.delete(fieldId);
  }
}
