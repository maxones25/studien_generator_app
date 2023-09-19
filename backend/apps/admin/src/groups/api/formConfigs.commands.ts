import { Roles } from '@admin/members/infrastructure/http';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import {
  Controller,
  Post,
  UseGuards,
  Query,
  Inject,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ErrorFilter,
  GetGroup,
  GroupGuard,
  GroupQueryDto,
  IsGroupDeletedGuard,
} from '../infrastructure/http';
import { FormGuard } from '@admin/forms/forms/guards/form.guard';
import { FormQueryDto } from '@admin/forms/forms/dtos/FormQueryDto';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import {
  ACTIVATE_FORM_CONFIG_USE_CASE,
  ADD_FORM_CONFIG_USE_CASE,
  DEACTIVATE_FORM_CONFIG_USE_CASE,
  IActivateFormConfigUseCase,
  IAddFormConfigUseCase,
  IDeactivateFormConfigUseCase,
  IRemoveFormConfigUseCase,
  ISetFormConfigTimeDependentUseCase,
  ISetFormConfigTimeIndependentUseCase,
  REMOVE_FORM_CONFIG_USE_CASE,
  SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE,
  SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE,
} from '../domain';
import { FormConfig, Group } from '@entities/core/group';
import { GetForm } from '@admin/forms/forms/decorators/form.decorator';
import { Form } from '@entities';
import { ConfigGuard } from '@admin/forms/configs/guards/config.guard';
import { Config } from '@admin/forms/configs/config.decorator';
import { ConfigQueryDto } from '@admin/forms/configs/dtos/ConfigQueryDto';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FormConfigsCommands {
  constructor(
    @Inject(ADD_FORM_CONFIG_USE_CASE)
    private readonly addFormToGroupUseCase: IAddFormConfigUseCase,
    @Inject(ACTIVATE_FORM_CONFIG_USE_CASE)
    private readonly activateFormConfigUseCase: IActivateFormConfigUseCase,
    @Inject(DEACTIVATE_FORM_CONFIG_USE_CASE)
    private readonly deactivateFormConfigUseCase: IDeactivateFormConfigUseCase,
    @Inject(SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE)
    private readonly setFormConfigTimeDependentUseCase: ISetFormConfigTimeDependentUseCase,
    @Inject(SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE)
    private readonly setFormConfigTimeIndependentUseCase: ISetFormConfigTimeIndependentUseCase,
    @Inject(REMOVE_FORM_CONFIG_USE_CASE)
    private readonly removeFormConfigUseCase: IRemoveFormConfigUseCase,
  ) {}

  @Post('addFormConfig')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard, FormGuard)
  async addFormToGroup(
    @Query() { studyId }: StudyQueryDto,
    @GetForm() form: Form,
    @GetGroup() group: Group,
  ) {
    const id = await this.addFormToGroupUseCase.execute({
      studyId,
      groupId: group.id,
      formId: form.id,
    });

    return {
      id,
      group: {
        id: group.id,
        name: group.name,
      },
      form: {
        id: form.id,
        name: form.name,
      },
    };
  }

  @Post('activateFormConfig')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  activateForm(@Query() { configId }: ConfigQueryDto) {
    return this.activateFormConfigUseCase.execute({ formConfigId: configId });
  }

  @Post('deactivateFormConfig')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  deactivateForm(@Query() { configId }: ConfigQueryDto) {
    return this.deactivateFormConfigUseCase.execute({ formConfigId: configId });
  }

  @Post('setFormConfigTimeDependent')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  setFormTimeDependent(@Query() { configId }: ConfigQueryDto) {
    return this.setFormConfigTimeDependentUseCase.execute({
      formConfigId: configId,
    });
  }

  @Post('setFormConfigTimeIndependent')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  setFormTimeIndependent(@Query() { configId }: ConfigQueryDto) {
    return this.setFormConfigTimeIndependentUseCase.execute({
      formConfigId: configId,
    });
  }

  @Post('removeFormConfig')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(ConfigGuard)
  async removeFormFromGroup(@Query() { configId }: ConfigQueryDto) {
    const group = await this.removeFormConfigUseCase.execute({ formConfigId: configId })
    
    return {
      group: {
        id: group.id,
        name: group.name,
      },
    };
  }
}
