import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../../pipes/validate-id.pipe';
import { FormComponentsService } from './form-components.service';
import { CreateFormComponentDto } from './dtos/CreateFormComponentDto';
import { FormComponentGuard } from './guards/form-component.guard';

@Controller('studies/:studyId/forms/:formId/pages/:pageId/components')
@UseGuards(FormComponentGuard)
export class FormComponentsController {
  constructor(private readonly formComponentsService: FormComponentsService) {}

  @Post()
  async create(
    @Param('pageId', new ValidateIdPipe()) pageId: string,
    @Body() body: CreateFormComponentDto,
  ) {
    return this.formComponentsService.create(pageId, body);
  }

  @Get()
  async getAll(@Param('pageId', new ValidateIdPipe()) pageId: string) {
    return this.formComponentsService.getAll(pageId);
  }

  @Roles('admin')
  @Delete(':componentId')
  async delete(
    @Param('componentId', new ValidateIdPipe()) componentId: string,
  ) {
    return this.formComponentsService.delete(componentId);
  }
}
