import { Body, Controller, Query, Post, UseGuards } from '@nestjs/common';
import { EntitiesService } from '../entities.service';
import { CreateEntityDto } from '../dtos/CreateEntityDto';
import { UpdateEntityDto } from '../dtos/UpdateEntityDto';
import { EntityGuard } from '../entity.guard';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { EntityQueryDto } from '../dtos/EntityQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('entities')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class EntitiesCommands {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post('createEntity')
  @Roles('admin', 'employee')
  async create(
    @Query() { studyId }: StudyQueryDto,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
  }

  @Post('changeName')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async changeName(
    @Query() { entityId }: EntityQueryDto,
    @Body() { name }: UpdateEntityDto,
  ) {
    return this.entitiesService.setName(entityId, name);
  }

  @Post('deleteEntity')
  @Roles('admin')
  @UseGuards(EntityGuard)
  async delete(@Query() { entityId }: EntityQueryDto) {
    return this.entitiesService.delete(entityId);
  }
}
