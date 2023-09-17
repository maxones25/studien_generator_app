import { Controller, Get, Query, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { EntitiesService } from '../services/entities.service';

@Controller('forms')
@UseGuards(StudyGuard)
export class EntitiesQueries {
  constructor(
    @Inject(EntitiesService)
    private readonly entitiesService: EntitiesService,
  ) {}

  @Get('getEntities')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard)
  async getEntities(@Query() { formId }: FormQueryDto) {
    return this.entitiesService.getByForm(formId);
  }
}
