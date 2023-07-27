import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FormComponentsService } from './form-components.service';
import { CreateFormComponentDto } from './dtos/CreateFormComponentDto';
import { FormComponentGuard } from './guards/form-component.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';

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
