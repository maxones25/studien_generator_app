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
import { FormsService } from './forms.service';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../pipes/validate-id.pipe';
import { CreateFormDto } from './dtos/CreateFormDto';
import { UpdateFormDto } from './dtos/UpdateFormDto';
import { FormGuard } from './guards/form.guard';

@Controller('studies/:studyId/forms')
@UseGuards(FormGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() body: CreateFormDto,
  ) {
    return this.formsService.create(studyId, body);
  }

  @Get()
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.formsService.getAll(studyId);
  }

  @Get(':formId')
  async getById(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.getById(formId);
  }

  @Put(':formId')
  async update(
    @Param('formId', new ValidateIdPipe()) formId: string,
    @Body() body: UpdateFormDto,
  ) {
    return this.formsService.update(formId, body);
  }

  @Roles('admin')
  @Delete(':formId')
  async delete(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.delete(formId);
  }
}
