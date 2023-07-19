import { Controller, Post, Param, Body, Get, Delete } from '@nestjs/common';
import { Types } from '../../../../decorators/type.decorator';
import { Roles } from '../../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../../pipes/validate-id.pipe';
import { FormComponentsService } from './form-components.service';
import { CreateFormComponentDto } from './dtos/CreateFormComponentDto';

@Controller('studies/:studyId/forms/:formId/pages/:pageId/components')
export class FormComponentsController {
  constructor(private readonly formComponentsService: FormComponentsService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('pageId', new ValidateIdPipe()) pageId: string,
    @Body() body: CreateFormComponentDto,
  ) {
    return this.formComponentsService.create(pageId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(@Param('pageId', new ValidateIdPipe()) pageId: string) {
    return this.formComponentsService.getAll(pageId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Delete(':componentId')
  async delete(
    @Param('componentId', new ValidateIdPipe()) componentId: string,
  ) {
    return this.formComponentsService.delete(componentId);
  }
}
