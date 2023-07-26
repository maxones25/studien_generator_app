import { FormConfiguration } from '@entities/form-configuration.entity';
import { Repository } from 'typeorm';

export class FormConfigurationsRepository extends Repository<FormConfiguration> {
  async getByForm(formId: string) {
    return this.find({
      where: {
        formId,
      },
      relations: {
        group: true,
        form: true,
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        group: {
          id: true,
          name: true,
        },
        form: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getByGroup(groupId: string) {
    return this.find({
      where: {
        groupId,
      },
      relations: {
        group: true,
        form: true,
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        group: {
          id: true,
          name: true,
        },
        form: {
          id: true,
          name: true,
        },
      },
    });
  }
}
