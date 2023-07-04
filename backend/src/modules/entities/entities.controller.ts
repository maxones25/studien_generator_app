import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Types } from '../../decorators/type.decorator';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from '../../pipes/validate-id.pipe';

@Controller('studies/:studyId/entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Types('director')
  @Roles('admin')
  @Post()
  async create(
    @Param('studyId') studyId: string,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
  }

  @Types('director')
  @Roles('admin')
  @Get()
  async getAll(@Param('studyId') studyId: string) {
    return this.entitiesService.getAll(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Get(':entityId')
  async getById(
    @Param('studyId', new ValidateIdPipe()) studyId: string,
    @Param('entityId', new ValidateIdPipe()) entityId: string,
  ) {
    return this.entitiesService.getById(studyId, entityId);
  }

  @Types('director')
  @Roles('admin')
  @Put(':entityId')
  async update(
    @Param('entityId', new ValidateIdPipe()) entityId: string,
    @Body() updateEntityDto: UpdateEntityFieldDto,
  ) {
    return this.entitiesService.update(entityId, updateEntityDto);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':entityId')
  async delete(@Param('entityId', new ValidateIdPipe()) entityId: string) {
    return this.entitiesService.delete(entityId);
  }
}
