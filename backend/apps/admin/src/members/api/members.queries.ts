import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import {
  GET_MEMBERS_BY_STUDY_USE_CASE,
  IGetMembersByStudyUseCase,
} from '@admin/members/domain';

@Controller('members')
export class MembersQueries {
  constructor(
    @Inject(GET_MEMBERS_BY_STUDY_USE_CASE)
    private readonly getMembersByStudyUseCase: IGetMembersByStudyUseCase,
  ) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getByStudy(@Query() { studyId }: StudyQueryDto) {
    return this.getMembersByStudyUseCase.execute({ studyId });
  }
}
