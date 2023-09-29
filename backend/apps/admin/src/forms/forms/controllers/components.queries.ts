import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ComponentsService } from '../services/components.service';
import { PageQueryDto } from '../dtos/PageQueryDto';
import { PageGuard } from '../guards/page.guard';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';

@Controller('forms')
@UseGuards(StudyGuard)
export class ComponentsQueries {
  constructor(
    @Inject(ComponentsService)
    private readonly componentsService: ComponentsService,
  ) {}

  @Get('getComponents')
  @UseGuards(PageGuard)
  async getAll(@Query() { pageId }: PageQueryDto) {
    return this.componentsService.getByPage(pageId);
  }
}
