import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MembersService } from '../members.service';
import { Roles } from '@admin/roles/roles.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';

@Controller('members')
export class MembersQueries {
  constructor(
    @Inject(MembersService)
    private readonly studyMembersService: MembersService,
  ) {}

  @Get('getByStudy')
  @Roles('admin', 'employee')
  async getByStudy(@Query() { studyId }: StudyQueryDto) {
    return this.studyMembersService.getByStudy(studyId);
  }
}
