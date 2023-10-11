import {
  Body,
  Controller,
  Post,
  Query,
  Inject,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Roles } from '@admin/studies/members/infrastructure/http';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { FormsService } from '../services/forms.service';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
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
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(FormGuard)
  async changeName(
    @Query() { formId }: FormQueryDto,
    @Body() { name }: ChangeNameDto,
  ) {
    return this.formsService.changeName(formId, name);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(FormGuard)
  async delete(@Query() { formId }: FormQueryDto) {
    return this.formsService.delete(formId);
  }
}
