import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../../pipes/validate-id.pipe';
import { FormPagesService } from './form-pages.service';
import { CreateFormPageDto } from './dtos/CreateFormPageDto';
import { UpdateFormPageDto } from './dtos/UpdateFormPageDto';
import { FormPageGuard } from './guards/form-page.guard';

@Controller('studies/:studyId/forms/:formId/pages')
@UseGuards(FormPageGuard)
export class FormPagesController {
  constructor(private readonly formPagesService: FormPagesService) {}

  @Post()
  async create(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormPageDto,
  ) {
    return this.formPagesService.create(formId, body);
  }

  @Get()
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formPagesService.getAll(formId);
  }

  @Put(':pageId')
  async update(
    @Param('pageId', new ValidateIdPipe()) pageId: string,
    @Body() body: UpdateFormPageDto,
  ) {
    return this.formPagesService.update(pageId, body);
  }

  @Roles('admin')
  @Delete(':pageId')
  async delete(@Param('pageId', new ValidateIdPipe()) pageId: string) {
    return this.formPagesService.delete(pageId);
  }
}
