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
  IActivateFormConfigUseCase,
  IAddFormConfigUseCase,
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

  // @Post('activate')
  // @HttpCode(HttpStatus.OK)
  // @Roles('admin', 'employee')
  // @UseGuards(ConfigGuard)
  // activateForm(@Config() config: FormConfiguration) {
  //   if (config.isActive)
  //     throw new BadRequestException('form is already active');
  //   return this.configsService.activate(config);
  // }

  // @Post('deactivate')
  // @HttpCode(HttpStatus.OK)
  // @Roles('admin', 'employee')
  // @UseGuards(ConfigGuard)
  // deactivateForm(@Config() form: FormConfiguration) {
  //   if (!form.isActive)
  //     throw new BadRequestException('form is already deactive');
  //   return this.configsService.deactivate(form);
  // }

  // @Post('setTimeDependent')
  // @HttpCode(HttpStatus.OK)
  // @Roles('admin', 'employee')
  // @UseGuards(ConfigGuard)
  // setFormTimeDependent(@Config() form: FormConfiguration) {
  //   if (form.type === FormConfigType.TimeDependent)
  //     throw new BadRequestException('form is alredy time dependent');
  //   return this.configsService.setTimeDependent(form);
  // }

  // @Post('setTimeIndependent')
  // @HttpCode(HttpStatus.OK)
  // @Roles('admin', 'employee')
  // @UseGuards(ConfigGuard)
  // setFormTimeIndependent(@Config() form: FormConfiguration) {
  //   if (form.type === FormConfigType.TimeIndependent)
  //     throw new BadRequestException('form is alredy time independent');
  //   return this.configsService.setTimeIndependent(form);
  // }

  // @Post('removeFromGroup')
  // @HttpCode(HttpStatus.OK)
  // @Roles('admin')
  // @UseGuards(ConfigGuard)
  // async removeFormFromGroup(@Config() form: FormConfiguration) {
  //   const group = await this.groupsService.getById(form.groupId);
  //   if (group === null)
  //     throw new BadRequestException('form is not a group form');
  //   await this.configsService.delete(form.id);
  //   return {
  //     group: {
  //       id: group.id,
  //       name: group.name,
  //     },
  //   };
  // }
}
