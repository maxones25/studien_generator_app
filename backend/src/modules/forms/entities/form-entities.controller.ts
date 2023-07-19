import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { Types } from '../../../decorators/type.decorator';
import { Roles } from '../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../pipes/validate-id.pipe';
import { CreateFormEntityDto } from './dtos/CreateFormEntityDto';
import { FormEntitiesService } from './form-entities.service';

@Controller('studies/:studyId/forms/:formId/entities')
export class FormEntitiesController {
  constructor(
    private readonly formEntitiesService: FormEntitiesService,
  ) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async addFormEntity(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormEntityDto,
  ) {
    return this.formEntitiesService.add(formId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formEntitiesService.getAll(formId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Delete(':entityId')
  async deleteFormEntity(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Param('entityId', new ValidateIdPipe()) entityId: string,
  ) {
    return this.formEntitiesService.remove(formId, entityId);
  }
}
