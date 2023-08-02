import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';
import { EntityGuard } from './entity.guard';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('studies/:studyId/entities')
@UseGuards(EntityGuard)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  @Roles('admin', 'employee')
  async create(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
  }

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

  @Put(':entityId')
  @Roles('admin', 'employee')
  async update(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() updateEntityDto: UpdateEntityDto,
  ) {
    return this.entitiesService.update(entityId, updateEntityDto);
  }

  @Delete(':entityId')
  @Roles('admin')
  async delete(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.delete(entityId);
  }

  @Get(':entityId/forms')
  @Roles('admin')
  async getForms(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.getForms(entityId);
  }
}
