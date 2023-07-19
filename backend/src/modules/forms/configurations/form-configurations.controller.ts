import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { Types } from '../../../decorators/type.decorator';
import { Roles } from '../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../pipes/validate-id.pipe';
import { FormConfigurationsService } from './form-configurations.service';
import { CreateFormConfigurationDto } from './dtos/CreateFormConfigurationDto';

@Controller('studies/:studyId/forms/:formId/configurations')
export class FormConfigurationsController {
  constructor(
    private readonly formConfigurationService: FormConfigurationsService,
  ) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormConfigurationDto,
  ) {
    return this.formConfigurationService.create(studyId, formId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Param('formId', new ValidateIdPipe()) formId: string,
  ) {
    return this.formConfigurationService.getAll(studyId, formId);
  }
}
