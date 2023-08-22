import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EntitiesService } from '../entities.service';
import { EntityGuard } from '../entity.guard';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('studies/:studyId/entities')
@UseGuards(EntityGuard)
export class EntitiesQueries {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  @Roles('admin', 'employee')
  async getAll(@Param('studyId', new ValidateIdPipe()) studyId: string) {
    return this.entitiesService.getAll(studyId);
  }

  @Get(':entityId')
  @Roles('admin', 'employee')
  async getById(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.getById(entityId);
  }

  @Get(':entityId/forms')
  @Roles('admin', 'employee')
  async getForms(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.getForms(entityId);
  }
}
