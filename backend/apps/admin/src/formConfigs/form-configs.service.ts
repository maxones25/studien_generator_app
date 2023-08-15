import { Inject, Injectable } from '@nestjs/common';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { FormConfigsRepository } from './form-configs.repository';
import { AddFormToGroupBodyDto } from './dtos/AddFormToGroupBodyDto';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { FormsRepository } from '@admin/forms/forms.repository';

@Injectable()
export class FormConfigsService {
  constructor(
    @Inject(FormConfigsRepository)
    private formConfigsRepository: FormConfigsRepository,
  ) {}

  async create(
    formId: string,
    studyId: string,
    groupId: string,
    { type, isActive }: AddFormToGroupBodyDto,
  ) {
    const formConfiguration = new FormConfiguration();

    formConfiguration.studyId = studyId;
    formConfiguration.formId = formId;
    formConfiguration.groupId = groupId;
    formConfiguration.isActive = isActive;
    formConfiguration.type = type;

    await this.formConfigsRepository.insert(formConfiguration);

    return formConfiguration.id;
  }

  getByGroup(groupId: string) {
    return this.formConfigsRepository.getByGroup(groupId);
  }

  async activate(form: FormConfiguration) {
    const { affected } = await this.formConfigsRepository.update(form.id, {
      isActive: true,
    });
    return affected === 1;
  }

  async deactivate(form: FormConfiguration) {
    const { affected } = await this.formConfigsRepository.update(form.id, {
      isActive: false,
    });
    // remove all open tasks
    return affected === 1;
  }

  async setTimeDependent(form: FormConfiguration) {
    const { affected } = await this.formConfigsRepository.update(form.id, {
      type: FormConfigType.TimeDependent,
    });
    return affected === 1;
  }

  async setTimeIndependent(form: FormConfiguration) {
    const { affected } = await this.formConfigsRepository.update(form.id, {
      type: FormConfigType.TimeIndependent,
    });
    // remove all open tasks
    return affected === 1;
  }

  async delete(id: string) {
    const { affected } = await this.formConfigsRepository.delete(id);
    // remove all open tasks
    return affected === 1;
  }
}
