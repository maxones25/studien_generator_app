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
}
