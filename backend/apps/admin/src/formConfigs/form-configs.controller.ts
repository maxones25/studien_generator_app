import { Roles } from '@admin/roles/roles.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FormConfigsService } from './form-configs.service';
import { StudyId } from '@admin/studies/study-id.decorator';
import { QueryGroupGuard } from '@admin/groups/guards/query-group.guard';
import { QueryFormGuard } from '@admin/forms/guards/query-form.guard';
import { FormConfigGuard } from './form-config.guard';
import { FormConfig } from './form-config.decorator';
import {
  FormConfiguration,
  Group as GroupEntity,
  Form as FormEntity,
} from '@entities';
import { FormConfigType } from '@shared/enums/form-config-type.enum';

import { GetFormsByGroupQueryDto } from './dtos/GetFormsByGroupQueryDto';
import { AddFormToGroupBodyDto } from './dtos/AddFormToGroupBodyDto';
import { Group } from '@admin/groups/group.decorator';
import { Form } from '@admin/forms/form.decorator';

@Controller('studies/:studyId')
export class FormConfigsController {
  constructor(
    @Inject(FormConfigsService)
    private formConfigsService: FormConfigsService,
  ) {}

  @Post('addFormToGroup')
  @Roles('admin', 'employee')
  @UseGuards(QueryGroupGuard, QueryFormGuard)
  async addFormToGroup(
    @StudyId() studyId: string,
    @Form() form: FormEntity,
    @Group() group: GroupEntity,
    @Body() body: AddFormToGroupBodyDto,
  ) {
    const id = await this.formConfigsService.create(
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

  @Get('formsByGroup')
  @Roles('admin', 'employee')
  @UseGuards(QueryGroupGuard)
  getFormsByGroup(@Query() { groupId }: GetFormsByGroupQueryDto) {
    return this.formConfigsService.getByGroup(groupId);
  }

  @Post('activateForm')
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  activateForm(@FormConfig() form: FormConfiguration) {
    if (form.isActive) throw new BadRequestException('form is already active');
    return this.formConfigsService.activate(form);
  }

  @Post('deactivateForm')
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  deactivateForm(@FormConfig() form: FormConfiguration) {
    if (!form.isActive)
      throw new BadRequestException('form is already deactive');
    return this.formConfigsService.deactivate(form);
  }

  @Post('setFormTimeDependent')
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  setFormTimeDependent(@FormConfig() form: FormConfiguration) {
    if (form.type === FormConfigType.TimeDependent)
      throw new BadRequestException('form is alredy time dependent');
    return this.formConfigsService.setTimeDependent(form);
  }

  @Post('setFormTimeIndependent')
  @Roles('admin', 'employee')
  @UseGuards(FormConfigGuard)
  setFormTimeIndependent(@FormConfig() form: FormConfiguration) {
    if (form.type === FormConfigType.TimeIndependent)
      throw new BadRequestException('form is alredy time independent');
    return this.formConfigsService.setTimeIndependent(form);
  }

  @Post('removeFormFromGroup')
  @Roles('admin')
  @UseGuards(FormConfigGuard)
  removeFormFromGroup(@FormConfig() form: FormConfiguration) {
    return this.formConfigsService.delete(form.id);
  }
}
