import {
  Controller,
  Get,
  Inject,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { DirectorId } from '@admin/directors/infrastructure/http';
import { StudiesService } from '../application';
import { StudyQueryDto, StudyGuard, ErrorFilter } from '../infrastructure/http';
import {
  GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE,
  IGetDirectorsNotMemberOfStudyUseCase,
} from '@admin/directors/domain';

@Controller('studies')
@UseFilters(ErrorFilter)
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
