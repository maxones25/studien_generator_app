import { Roles } from '@admin/members/infrastructure/http';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormsService } from '@admin/forms/forms/services/forms.service';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupQueryDto } from '@admin/groups/infrastructure/http';
import { ConfigsService } from '@admin/forms/configs/services/configs.service';
import { GetByGroupQueryDto } from '@admin/forms/configs/dtos/GetByGroupQueryDto';

@Controller('forms')
@UseGuards(StudyGuard)
export class FormConfigsQueries {
  constructor(
    @Inject(ConfigsService)
    private configsService: ConfigsService,
    @Inject(FormsService)
    private formsService: FormsService,
  ) {}

  @Get('getByGroup')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  getFormsByGroup(
    @Query() { groupId }: GroupQueryDto,
    @Query() query: GetByGroupQueryDto,
  ) {
    return this.configsService.getByGroup(groupId, query);
  }

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
