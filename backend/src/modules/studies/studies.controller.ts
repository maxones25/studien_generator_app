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
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Types } from '../../decorators/type.decorator';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { director } from 'test/fakeData';

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
  @Get(':studyId')
  async getById(
    @Param('studyId') studyId: string,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.findOne(studyId, directorId);
  }

  @Types('director')
  @Roles('admin')
  @Put(':studyId')
  async update(
    @Param('studyId') studyId: string,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    return this.studiesService.update(studyId, updateStudyDto);
  }

  @Types('director')
  @Roles('admin')
  @Delete(':studyId')
  async delete(@Param('studyId') studyId: string) {
    return this.studiesService.delete(studyId);
  }

  @Types('director')
  @Roles('admin', 'employee')
  @Get(':studyId/members')
  async findMembersByStudy(@Param('studyId') studyId: string) {
    return this.studiesService.getMembers(studyId);
  }

  @Types('director')
  @Roles('admin')
  @Post(':studyId/members')
  async addMember(
    @Param('studyId') studyId: string,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.studiesService.addMember(studyId, addMemberDto);
  }

  @Types('director')
  @Roles('admin')
  @Put(':studyId/members/:directorId')
  async updateMember(
    @Param('studyId') studyId: string,
    @Param('directorId') directorId: string,
    @Body() updatedMember: UpdateMemberDto,
  ) {
    return this.studiesService.updateMember(studyId, directorId, updatedMember);
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
