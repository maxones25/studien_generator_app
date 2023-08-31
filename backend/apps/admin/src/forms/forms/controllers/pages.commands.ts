import { Controller, Post, Query, Inject, UseGuards } from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { PageGuard } from '../guards/page.guard';
import { PagesService } from '../services/page.service';
import { Page } from '../decorators/page.decorator';
import { FormPage } from '@entities';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class PagesCommands {
  constructor(
    @Inject(PagesService)
    private readonly pagesService: PagesService,
  ) {}

  @Post('addPage')
  @Roles('admin')
  @UseGuards(FormGuard)
  async addPage(@Query() { formId }: FormQueryDto) {
    return this.pagesService.add(formId);
  }

  @Post('removePage')
  @Roles('admin')
  @UseGuards(PageGuard)
  async removePage(@Page() page: FormPage) {
    return this.pagesService.remove(page.formId, page.id);
  }
}
