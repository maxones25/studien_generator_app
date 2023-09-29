import { Controller, Get, UseGuards, Query, Inject } from '@nestjs/common';
import { FormGuard } from '../guards/form.guard';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { Roles } from '@admin/members/infrastructure/http';
import { PagesService } from '../services/page.service';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';

@Controller('forms')
@UseGuards(StudyGuard, FormGuard)
export class PagesQueries {
  constructor(
    @Inject(PagesService)
    private readonly pagesService: PagesService,
  ) {}

  @Get('getPages')
  @Roles('admin', 'employee')
  async getPages(@Query() { formId }: FormQueryDto) {
    return this.pagesService.getByForm(formId);
  }
}
