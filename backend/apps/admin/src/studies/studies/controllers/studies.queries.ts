import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { DirectorId } from '@admin/directors/infrastructure/http/decorators/director-id.decorator';
import { StudyGuard } from '../guards/study.guard';
import { StudiesService } from '../studies.service';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import {
  GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE,
  IGetDirectorsNotMemberOfStudyUseCase,
} from '@admin/directors/domain';

@Controller('studies')
export class StudiesQueries {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
    @Inject(GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE)
    private readonly getDirectorsNotMemberOfStudyUseCase: IGetDirectorsNotMemberOfStudyUseCase,
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
    return this.getDirectorsNotMemberOfStudyUseCase.execute({ studyId });
  }
}
