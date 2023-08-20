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
import { FormsService } from '../forms.service';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { UpdateFormDto } from '../dtos/UpdateFormDto';
import { FormGuard } from '../guards/form.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';

@Controller('studies/:studyId/forms')
@UseGuards(FormGuard)
export class FormsQueries {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.formsService.getAll(studyId);
  }

  @Get(':formId')
  async getById(@Param('formId', new ValidateIdPipe()) formId: string) {
    return this.formsService.getById(formId);
  }
}
