import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from '../../decorators/roles.decorator';
import { DirectorId } from '../../decorators/director-id.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Types } from '../../decorators/type.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Types('director')
  @Get()
  async findStudiesByDirector(@DirectorId() directorId: string) {
    return this.studiesService.getByDirector(directorId);
  }

  @Types('director')
  @Post()
  async create(
    @Body() createStudyDto: CreateStudyDto,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.create(createStudyDto, directorId);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':studyId')
  async delete(@Param('studyId') studyId: string) {
    return this.studiesService.delete(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post(':studyId/members')
  async addMember(
    @Param('studyId') studyId: string,
    @Body() addOrRemoveDirector: AddOrRemoveDirector,
  ) {
    return this.studiesService.addMember(studyId, addOrRemoveDirector);
  }

  @Types('director')
  @Roles('admin')
  @Put(':studyId/members/:directorId')
  async updateMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Body() updateMember: UpdateMemberDto,
  ) {
    return this.studiesService.updateMember(studyId, directorId, updateMember);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':studyId/members/:directorId')
  async removeMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
  ) {
    return this.studiesService.removeMember(studyId, directorId);
  }
}
