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
import { CreateFormUseCase } from '../transactions/CreateFormUseCase';
import { ICreateFormUseCase } from '../domain/ICreateFormUseCase';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FormsCommands {
  constructor(
    @Inject(FormsService)
    private readonly formsService: FormsService,
    @Inject(CreateFormUseCase)
    private readonly createFormUseCase: ICreateFormUseCase,
  ) {}

  @Post('create')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateFormDto,
  ) {
    return this.createFormUseCase.execute({ studyId, data });
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
