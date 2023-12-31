import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { FormsService } from '../services/forms.service';
import { FormGuard } from '../guards/form.guard';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { Roles } from '@admin/studies/members/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { EntityQueryDto } from '@admin/entities/infrastructure/http/dtos/EntityQueryDto';
import { EntityGuard } from '@admin/entities/infrastructure/http/guards/entity.guard';

@Controller('forms')
@UseGuards(StudyGuard)
export class FormsQueries {
  constructor(private readonly formsService: FormsService) {}

  @Get('getAll')
  @Roles('admin', 'employee')
  async getAll(@Query() { studyId }: StudyQueryDto) {
    return this.formsService.getAll(studyId);
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard)
  async getById(@Query() { formId }: FormQueryDto) {
    return this.formsService.getById(formId);
  }

  @Get('getByEntity')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async getByEntity(@Query() { entityId }: EntityQueryDto) {
    return this.formsService.getByEntity(entityId);
  }
}
