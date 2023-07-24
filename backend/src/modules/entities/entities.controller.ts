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
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../pipes/validate-id.pipe';
import { UpdateEntityDto } from './dtos/UpdateEntityDto';
import { EntityGuard } from './guards/entity.guard';

@Controller('studies/:studyId/entities')
@UseGuards(EntityGuard)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  async create(
    @Param('studyId') studyId: string,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
  }

  @Get()
  async getAll(@Param('studyId') studyId: string) {
    return this.entitiesService.getAll(studyId);
  }

  @Get(':entityId')
  async getById(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.getById(entityId);
  }

  @Put(':entityId')
  async update(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() updateEntityDto: UpdateEntityDto,
  ) {
    return this.entitiesService.update(entityId, updateEntityDto);
  }

  @Roles('admin')
  @Delete(':entityId')
  async delete(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.delete(entityId);
  }
}
