import { Controller, Post, Param, Body, Get, Put, Query } from '@nestjs/common';
import { FormConfigurationsService } from './form-configurations.service';
import { CreateFormConfigurationDto } from './dtos/CreateFormConfigurationDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { UpdateFormConfigurationDto } from './dtos/UpdateFormConfigurationDto';
import { GetAllFormConfigurationsQueryParams } from './dtos/GetAllFormConfigurationsQueryParams';

@Controller('studies/:studyId/forms/:formId/configurations')
export class FormConfigurationsController {
  constructor(
    private readonly formConfigurationService: FormConfigurationsService,
  ) {}

  @Post()
  @Roles('admin', 'employee')
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
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Query() params: GetAllFormConfigurationsQueryParams,
  ) {
    return this.formConfigurationService.getAll(formId, params);
  }

  @Roles('admin', 'employee')
  @Put(':formConfigId')
  async update(
    @Param('formConfigId', new ValidateIdPipe()) formConfigId: string,
    @Body() body: UpdateFormConfigurationDto,
  ) {
    return this.formConfigurationService.update(formConfigId, body);
  }
}
