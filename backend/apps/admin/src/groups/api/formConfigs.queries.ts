import { Roles } from '@admin/members/infrastructure/http';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormsService } from '@admin/forms/forms/services/forms.service';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupQueryDto } from '@admin/groups/infrastructure/http';
import { ConfigsService } from '@admin/forms/configs/services/configs.service';
import { GetByGroupQueryDto } from '@admin/forms/configs/dtos/GetByGroupQueryDto';
import {
  GET_FORM_CONFIGS_USE_CASE,
  IGetFormConfigsUseCase,
} from '../domain/useCases/formConfigs/IGetFormConfigsUseCase';

@Controller('groups')
@UseGuards(StudyGuard)
export class FormConfigsQueries {
  constructor(
    @Inject(ConfigsService)
    private configsService: ConfigsService,
    @Inject(FormsService)
    private formsService: FormsService,
    @Inject(GET_FORM_CONFIGS_USE_CASE)
    private readonly getFormConfigsUseCase: IGetFormConfigsUseCase,
  ) {}

  @Get('getFormConfigs')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard)
  getFormsByGroup(
    @Query() { groupId }: GroupQueryDto,
    @Query() { type, isActive }: GetByGroupQueryDto,
  ) {
    return this.getFormConfigsUseCase.execute({ groupId, type, isActive });
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
