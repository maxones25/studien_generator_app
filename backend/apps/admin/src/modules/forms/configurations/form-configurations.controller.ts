import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { FormConfigurationsService } from './form-configurations.service';
import { CreateFormConfigurationDto } from './dtos/CreateFormConfigurationDto';
import { Roles } from '@admin/modules/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';

@Controller('studies/:studyId/forms/:formId/configurations')
export class FormConfigurationsController {
  constructor(
    private readonly formConfigurationService: FormConfigurationsService,
  ) {}

  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormConfigurationDto,
  ) {
    return this.formConfigurationService.create(studyId, formId, body);
  }

  @Roles('admin', 'employee')
  @Get()
  async getAll(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Param('formId', new ValidateIdPipe()) formId: string,
  ) {
    return this.formConfigurationService.getAll(studyId, formId);
  }
}
