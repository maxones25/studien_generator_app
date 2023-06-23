import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from '../../decorators/roles.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Types } from '../../decorators/type.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Types('director')
  @Get()
  async findAll() {
    return this.studiesService.findAll();
  }

  @Types('director')
  @Post()
  async create(
    @Body() createStudyDto: CreateStudyDto,
    @Request() req,
    ) {
    return this.studiesService.create(createStudyDto, req.payload.directorId);
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
    @Body() updateMember: UpdateMemberDto,
  ) {
    return this.studiesService.updateMember(
      studyId,
      directorId,
      updateMember,
    );
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
