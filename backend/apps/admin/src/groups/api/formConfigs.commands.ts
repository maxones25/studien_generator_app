import { Roles } from '@admin/studies/members/infrastructure/http';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
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
  ConfigQueryDto,
  ErrorFilter,
  FormConfigGuard,
  GetGroup,
  GroupGuard,
  IsGroupDeletedGuard,
} from '../infrastructure/http';
import { FormGuard } from '@admin/forms/forms/guards/form.guard';
import { StudyQueryDto } from '@admin/studies/studies/infrastructure/http/dtos/StudyQueryDto';
import * as Domain from '../domain';
import { Group } from '@entities/core/group';
import { GetForm } from '@admin/forms/forms/decorators/form.decorator';
import { Form } from '@entities';

@Controller('groups')
@UseFilters(ErrorFilter)
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class FormConfigsCommands {
  constructor(
    @Inject(Domain.ADD_FORM_CONFIG_USE_CASE)
    private readonly addFormToGroupUseCase: Domain.IAddFormConfigUseCase,
    @Inject(Domain.ACTIVATE_FORM_CONFIG_USE_CASE)
    private readonly activateFormConfigUseCase: Domain.IActivateFormConfigUseCase,
    @Inject(Domain.DEACTIVATE_FORM_CONFIG_USE_CASE)
    private readonly deactivateFormConfigUseCase: Domain.IDeactivateFormConfigUseCase,
    @Inject(Domain.SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE)
    private readonly setFormConfigTimeDependentUseCase: Domain.ISetFormConfigTimeDependentUseCase,
    @Inject(Domain.SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE)
    private readonly setFormConfigTimeIndependentUseCase: Domain.ISetFormConfigTimeIndependentUseCase,
    @Inject(Domain.REMOVE_FORM_CONFIG_USE_CASE)
    private readonly removeFormConfigUseCase: Domain.IRemoveFormConfigUseCase,
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
  @UseGuards(FormConfigGuard)
  activateForm(@Query() { configId }: ConfigQueryDto) {
    return this.activateFormConfigUseCase.execute({ formConfigId: configId });
  }

  @Post('deactivateFormConfig')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  deactivateForm(@Query() { configId }: ConfigQueryDto) {
    return this.deactivateFormConfigUseCase.execute({ formConfigId: configId });
  }

  @Post('setFormConfigTimeDependent')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  setFormTimeDependent(@Query() { configId }: ConfigQueryDto) {
    return this.setFormConfigTimeDependentUseCase.execute({
      formConfigId: configId,
    });
  }

  @Post('setFormConfigTimeIndependent')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  setFormTimeIndependent(@Query() { configId }: ConfigQueryDto) {
    return this.setFormConfigTimeIndependentUseCase.execute({
      formConfigId: configId,
    });
  }

  @Post('removeFormConfig')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(FormConfigGuard)
  async removeFormFromGroup(@Query() { configId }: ConfigQueryDto) {
    const group = await this.removeFormConfigUseCase.execute({
      formConfigId: configId,
    });

    return {
      group: {
        id: group.id,
        name: group.name,
      },
    };
  }
}
