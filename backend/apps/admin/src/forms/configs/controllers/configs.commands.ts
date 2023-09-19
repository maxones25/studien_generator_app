import { Roles } from '@admin/members/infrastructure/http';
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigGuard } from '../guards/config.guard';
import {
  FormConfiguration,
  Group as GroupEntity,
  Form as FormEntity,
} from '@entities';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { GetGroup } from '@admin/groups/group.decorator';
import { Form } from '@admin/forms/forms/decorators/form.decorator';
import { FormGuard } from '@admin/forms/forms/guards/form.guard';
import { Config } from '../config.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupGuard } from '@admin/groups/infrastructure/http/guards/group.guard';
import { ConfigsService } from '../services/configs.service';
import { GroupsService } from '@admin/groups/groups.service';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';
import { IsGroupDeletedGuard } from '@admin/groups/infrastructure/http/guards/IsGroupDeletedGuard';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class ConfigsCommands {
  constructor(
    @Inject(ConfigsService)
    private configsService: ConfigsService,
    @Inject(GroupsService)
    private groupsService: GroupsService,
  ) {}

  @Post('addToGroup')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, IsGroupDeletedGuard, FormGuard)
  async addFormToGroup(
    @Query() { studyId }: StudyQueryDto,
    @Form() form: FormEntity,
    @GetGroup() group: GroupEntity,
  ) {
    const configs = await this.configsService.getByGroupAndForm(
      group.id,
      form.id,
    );

    if (configs.length > 1)
      throw new BadRequestException('config already exists');

    const config = configs[0];

    const type =
      configs.length === 0
        ? FormConfigType.TimeDependent
        : configs[0].type === FormConfigType.TimeDependent
        ? FormConfigType.TimeIndependent
        : FormConfigType.TimeDependent;

    const id = await this.configsService.create(
      form.id,
      studyId,
      group.id,
      type,
    );

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

  @Post('activate')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  activateForm(@Config() config: FormConfiguration) {
    if (config.isActive)
      throw new BadRequestException('form is already active');
    return this.configsService.activate(config);
  }

  @Post('deactivate')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  deactivateForm(@Config() form: FormConfiguration) {
    if (!form.isActive)
      throw new BadRequestException('form is already deactive');
    return this.configsService.deactivate(form);
  }

  @Post('setTimeDependent')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  setFormTimeDependent(@Config() form: FormConfiguration) {
    if (form.type === FormConfigType.TimeDependent)
      throw new BadRequestException('form is alredy time dependent');
    return this.configsService.setTimeDependent(form);
  }

  @Post('setTimeIndependent')
  @Roles('admin', 'employee')
  @UseGuards(ConfigGuard)
  setFormTimeIndependent(@Config() form: FormConfiguration) {
    if (form.type === FormConfigType.TimeIndependent)
      throw new BadRequestException('form is alredy time independent');
    return this.configsService.setTimeIndependent(form);
  }

  @Post('removeFromGroup')
  @Roles('admin')
  @UseGuards(ConfigGuard)
  async removeFormFromGroup(@Config() form: FormConfiguration) {
    const group = await this.groupsService.getById(form.groupId);
    if (group === null)
      throw new BadRequestException('form is not a group form');
    await this.configsService.delete(form.id);
    return {
      group: {
        id: group.id,
        name: group.name,
      },
    };
  }
}
