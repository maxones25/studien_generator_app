import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Types } from '../../decorators/type.decorator';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../pipes/validate-id.pipe';
import { FieldsService } from './fields.service';
import { GetFieldQueryParamsDto } from './dtos/GetFieldQueryParamsDto';

@Controller('studies/:studyId/entities/:entityId/fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async addField(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() body: CreateEntityFieldDto,
  ) {
    return this.fieldsService.add(entityId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getFields(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Query() { groupId }: GetFieldQueryParamsDto,
  ) {
    return this.fieldsService.getAll(entityId, groupId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Put(':fieldId')
  async updateField(
    @Param('fieldId', new ValidateIdPipe()) fieldId: string,
    @Body() body: UpdateEntityFieldDto,
  ) {
    return this.fieldsService.update(fieldId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Delete(':fieldId')
  async deleteField(@Param('fieldId', new ValidateIdPipe()) fieldId: string) {
    return this.fieldsService.delete(fieldId);
  }
}
