import { Body, Controller, Post, Query, Inject } from '@nestjs/common';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Roles } from '@admin/roles/roles.decorator';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { UpdateFormDto } from '../dtos/UpdateFormDto';
import { FormsService } from '../forms.service';
import { StudyQueryDto } from '@admin/studies/dtos/StudyQueryDto';

@Controller('forms')
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
  async changeName(
    @Query() { formId }: FormQueryDto,
    @Body() body: UpdateFormDto,
  ) {
    return this.formsService.changeName(formId, body);
  }

  @Post('delete')
  @Roles('admin')
  async delete(@Query() { formId }: FormQueryDto) {
    return this.formsService.delete(formId);
  }
}
