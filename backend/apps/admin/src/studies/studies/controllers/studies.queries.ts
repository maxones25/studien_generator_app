import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/infrastructure/http/decorators/director-id.decorator';
import { StudyGuard } from '../guards/study.guard';
import { StudiesService } from '../studies.service';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import { DirectorsService } from '@admin/directors/application/services/directors.service';
import { DIRECTORS_SERVICE } from '@admin/directors/domain';

@Controller('studies')
export class StudiesQueries {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
    @Inject(DIRECTORS_SERVICE)
    private readonly directorsService: DirectorsService,
  ) {}

  @Get('getAll')
  async getAll(@DirectorId() directorId: string) {
    return this.studiesService.getByDirector(directorId);
  }

  @Get('getById')
  @Roles('admin', 'employee')
  @UseGuards(StudyGuard)
  async getById(
    @Query() { studyId }: StudyQueryDto,
    @DirectorId() directorId: string,
  ) {
    return this.studiesService.getByOneDirector(studyId, directorId);
  }

  @Get('getNonStudyMembers')
  @Roles('admin', 'employee')
  @UseGuards(StudyGuard)
  async getNonStudyMembers(@Query() { studyId }: StudyQueryDto) {
    return this.directorsService.getNonStudyMembers(studyId);
  }
}
