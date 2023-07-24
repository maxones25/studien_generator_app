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
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dtos/createStudyDto';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { Roles } from '@admin/modules/roles/roles.decorator';
import { DirectorId } from '@admin/decorators/director-id.decorator';
import { StudyGuard } from './guards/study.guard';

@Controller('studies')
@UseGuards(StudyGuard)
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  async create(
    @Body() createStudyDto: CreateStudyDto,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.create(createStudyDto, directorId);
  }

  @Get()
  async getAll(@DirectorId() directorId: string) {
    return this.studiesService.getByDirector(directorId);
  }

  @Get(':studyId')
  async getById(
    @Param('studyId') studyId: string,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.getOneByDirector(studyId, directorId);
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
