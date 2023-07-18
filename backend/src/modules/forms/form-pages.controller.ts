import {
  Controller,
  Post,
  Param,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Types } from '../../decorators/type.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { FormPagesService } from './form-pages.service';
import { CreateFormPageDto } from './dtos/CreateFormPageDto';
import { UpdateFormPageDto } from './dtos/UpdateFormPageDto';

@Controller('studies/:studyId/forms/:formId/pages')
export class FormPagesController {
  constructor(private readonly formPagesService: FormPagesService) {}

  @Types('director')
  @Roles('admin', 'employee')
  @Post()
  async create(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: CreateFormPageDto,
  ) {
    return this.formPagesService.create(formId, body);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get()
  async getAll(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formPagesService.getAll(formId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Put(':pageId')
  async update(
    @Param('pageId', new ValidateIdPipe()) pageId: string,
    @Body() body: UpdateFormPageDto,
  ) {
    return this.formPagesService.update(pageId, body);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':pageId')
  async delete(@Param('pageId', new ValidateIdPipe()) pageId: string) {
    return this.formPagesService.delete(pageId);
  }
}
