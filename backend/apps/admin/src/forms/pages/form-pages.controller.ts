import {
  Controller,
  Post,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FormPagesService } from './form-pages.service';
import { FormPageGuard } from './guards/form-page.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { FormGuard } from '../guards/form.guard';

@Controller('studies/:studyId/forms/:formId/pages')
@UseGuards(FormGuard, FormPageGuard)
export class FormPagesController {
  constructor(private readonly formPagesService: FormPagesService) {}

  @Post()
  async create(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formPagesService.create(formId);
  }

  @Get()
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formPagesService.getAll(formId);
  }

  @Roles('admin')
  @Delete(':pageId')
  async delete(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Param('pageId', new ValidateIdPipe()) pageId: string,
  ) {
    return this.formPagesService.delete(formId, pageId);
  }
}
