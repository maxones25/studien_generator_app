import { Roles } from '@admin/members/infrastructure/http';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormsService } from '@admin/forms/forms/services/forms.service';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupQueryDto } from '@admin/groups/infrastructure/http';

@Controller('forms')
@UseGuards(StudyGuard)
export class ConfigsQueries {
  constructor(
    @Inject(FormsService)
    private formsService: FormsService,
  ) {}

  @Get('getNonGroup')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  getNonGroup(
    @Query() { studyId }: StudyQueryDto,
    @Query() { groupId }: GroupQueryDto,
  ) {
    return this.formsService.getNonGroup(studyId, groupId);
  }
}
