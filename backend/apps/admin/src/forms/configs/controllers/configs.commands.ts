import { Roles } from '@admin/roles/roles.decorator';
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
import { AddToGroupDto } from '../dtos/AddToGroupDto';
import { Group } from '@admin/groups/group.decorator';
import { Form } from '@admin/forms/forms/decorators/form.decorator';
import { FormGuard } from '@admin/forms/forms/guards/form.guard';
import { Config } from '../config.decorator';
import { StudyQueryDto } from '@admin/studies/studies/dtos/StudyQueryDto';
import { GroupGuard } from '@admin/groups/guards/group.guard';
import { ConfigsService } from '../services/configs.service';

@Controller('forms')
export class ConfigsController {
  constructor(
    @Inject(ConfigsService)
    private configsService: ConfigsService,
  ) {}

  @Post('addToGroup')
  @Roles('admin', 'employee')
  @UseGuards(GroupGuard, FormGuard)
  async addFormToGroup(
    @Query() { studyId }: StudyQueryDto,
    @Form() form: FormEntity,
    @Group() group: GroupEntity,
    @Body() body: AddToGroupDto,
  ) {
    const id = await this.configsService.create(
      form.id,
      studyId,
      group.id,
      body,
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
  removeFormFromGroup(@Config() form: FormConfiguration) {
    return this.configsService.delete(form.id);
  }
}
