import { Roles } from '@admin/roles/roles.decorator';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@admin/groups/guards/group.guard';
import { GroupQueryDto } from '@admin/groups/dtos/GroupQueryDto';
import { ConfigsService } from '../services/configs.service';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormsService } from '@admin/forms/forms/services/forms.service';
import { GetByGroupQueryDto } from '../dtos/GetByGroupQueryDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';

@Controller('forms')
@UseGuards(StudyGuard)
export class ConfigsQueries {
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
