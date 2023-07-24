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
import { CreateStudyDto } from './dtos/createStudyDto';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { Roles } from '@admin/modules/roles/roles.decorator';
import { DirectorId } from '@admin/decorators/director-id.decorator';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Get()
  async findStudiesByDirector(@DirectorId() directorId: string) {
    return this.studiesService.getByDirector(directorId);
  }

  @Post()
  async create(
    @Body() createStudyDto: CreateStudyDto,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.create(createStudyDto, directorId);
  }

  @Get(':studyId')
  async getById(
    @Param('studyId') studyId: string,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.findOne(studyId, directorId);
  }

  @Roles('admin')
  @Put(':studyId')
  async update(
    @Param('studyId') studyId: string,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    return this.studiesService.update(studyId, updateStudyDto);
  }

  @Roles('admin')
  @Delete(':studyId')
  async delete(@Param('studyId') studyId: string) {
    return this.studiesService.delete(studyId);
  }
}
