import {
  Body,
  Controller,
  Post,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Roles } from '@admin/roles/roles.decorator';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { FormsService } from '../services/forms.service';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FormsCommands {
  constructor(
    @Inject(FormsService)
    private readonly formsService: FormsService,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateFormDto,
  ) {
    return this.formsService.create(studyId, body);
  }

  @Post('changeName')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard)
  async changeName(
    @Query() { formId }: FormQueryDto,
    @Body() { name }: ChangeNameDto,
  ) {
    return this.formsService.changeName(formId, name);
  }

  @Post('delete')
  @Roles('admin')
  @UseGuards(FormGuard)
  async delete(@Query() { formId }: FormQueryDto) {
    return this.formsService.delete(formId);
  }
}
