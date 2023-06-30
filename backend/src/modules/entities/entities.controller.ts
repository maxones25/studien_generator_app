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
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { CreateFieldAttributeDto } from './dtos/CreateFieldAttributeDto';
import { Roles } from '../../decorators/roles.decorator';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';

@Controller('studies/:studyId/entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Types('director')
  @Roles('admin')
  @Get()
  async getAll(@Param('studyId') studyId: string) {
    return this.entitiesService.getByStudy(studyId);
  }

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
  @Post('study')
  async createAndAddStudy(
    @Param('studyId') studyId: string,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
  }

  @Types('director')
  @Roles('admin')
  @Post('groups')
  async createAndAddGroups(
    @Param('studyId') studyId: string,
    @Body() body: CreateEntityDto,
  ) {
    return this.entitiesService.create(studyId, body);
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
  @Post(':entityId/study')
  async addToStudy(
    @Param('studyId') studyId: string,
    @Param('entityId') entityId: string,
  ) {
    return this.entitiesService.addToStudy(entityId, studyId);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':entityId/study')
  async deleteFromStudy(
    @Param('studyId') studyId: string,
    @Param('entityId') entityId: string,
  ) {
    return this.entitiesService.removeFromStudy(entityId, studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post(':entityId/groups/:groupId')
  async addToGroup(
    @Param('studyId') studyId: string,
    @Param('entityId') entityId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.entitiesService.addToGroup(entityId, studyId, groupId);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':entityId/groups/:groupId')
  async deleteFromGroup(
    @Param('entityId') entityId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.entitiesService.removeFromGroup(entityId, groupId);
  }

  @Types('director')
  @Roles('admin')
  @Post(':entityId/fields')
  async addField(
    @Param('entityId') entityId: string,
    @Body() body: CreateEntityFieldDto,
  ) {
    return this.entitiesService.addField(entityId, body);
  }

  @Types('director')
  @Roles('admin')
  @Put('fields/:fieldId')
  async updateField(
    @Param('fieldId') fieldId: string,
    @Body() body: UpdateEntityFieldDto,
  ) {
    return this.entitiesService.updateField(fieldId, body);
  }

  @Types('director')
  @Roles('admin')
  @Delete('fields/:fieldId')
  async deleteField(@Param('fieldId') fieldId: string) {
    return this.entitiesService.deleteField(fieldId);
  }

  @Types('director')
  @Roles('admin')
  @Post('fields/:fieldId/attributes')
  async createAttribute(
    @Param('fieldId') fieldId: string,
    @Body() body: CreateFieldAttributeDto,
  ) {
    return this.entitiesService.addAttribute(fieldId, body);
  }

  @Types('director')
  @Roles('admin')
  @Get('fields/:fieldId/attributes')
  async getAttributes(@Param('fieldId') fieldId: string) {
    return this.entitiesService.getAttributes(fieldId);
  }
}
