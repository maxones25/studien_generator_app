import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateFormEntityDto } from './dtos/CreateFormEntityDto';
import { FormEntitiesService } from './form-entities.service';
import { Roles } from '@admin/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { FormEntityGuard } from './form-entity.guard';
import { FormGuard } from '../form.guard';

@Controller('studies/:studyId/forms/:formId/entities')
@UseGuards(FormGuard, FormEntityGuard)
export class FormEntitiesController {
  constructor(private readonly formEntitiesService: FormEntitiesService) {}

  @Roles('admin', 'employee')
  @Post()
  async addFormEntity(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormEntityDto,
  ) {
    return this.formEntitiesService.add(formId, body);
  }

  @Roles('admin', 'employee')
  @Get()
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formEntitiesService.getAll(formId);
  }

  @Roles('admin', 'employee')
  @Delete(':entityId')
  async deleteFormEntity(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Param('entityId', new ValidateIdPipe()) entityId: string,
  ) {
    return this.formEntitiesService.remove(formId, entityId);
  }
}
