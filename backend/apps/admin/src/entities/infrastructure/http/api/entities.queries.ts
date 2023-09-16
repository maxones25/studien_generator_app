import { EntitiesService } from '@admin/entities/application';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import {
  EntityGuard,
  EntityQueryDto,
} from '@admin/entities/infrastructure/http';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('entities')
@UseGuards(StudyGuard)
export class EntitiesQueries {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get('getAll')
  @Roles('admin', 'employee')
  async getAll(@Query() { studyId }: StudyQueryDto) {
    return this.entitiesService.getAll(studyId);
  }

  @Get('getById')
  @UseGuards(EntityGuard)
  @Roles('admin', 'employee')
  async getById(@Query() { entityId }: EntityQueryDto) {
    return this.entitiesService.getById(entityId);
  }
}
