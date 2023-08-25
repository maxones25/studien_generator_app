import { Inject, Injectable } from '@nestjs/common';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { ConfigsRepository } from '../repositories/configs.repository';
import { AddToGroupDto } from '../dtos/AddToGroupDto';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class ConfigsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(ConfigsRepository)
    private formConfigsRepository: ConfigsRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.formConfigsRepository.getRelatedByStudy(studyId, id);
  }

  async create(
    formId: string,
    studyId: string,
    groupId: string,
    { type, isActive }: AddToGroupDto,
  ) {
    const config = await this.formConfigsRepository.create({
      studyId,
      formId,
      groupId,
      isActive,
      type,
    });
    return config.id;
  }

  async getByGroup(groupId: string) {
    return this.formConfigsRepository.getByGroup(groupId);
  }

  async activate(form: FormConfiguration) {
    return await this.formConfigsRepository.update(form.id, {
      isActive: true,
    });
  }

  async deactivate(form: FormConfiguration) {
    return await this.formConfigsRepository.update(form.id, {
      isActive: false,
    });
  }

  async setTimeDependent(form: FormConfiguration) {
    return await this.formConfigsRepository.update(form.id, {
      type: FormConfigType.TimeDependent,
    });
  }

  async setTimeIndependent(form: FormConfiguration) {
    return await this.formConfigsRepository.update(form.id, {
      type: FormConfigType.TimeIndependent,
    });
  }

  async delete(id: string) {
    return await this.formConfigsRepository.delete(id);
  }
}
