import { FormConfiguration } from '@entities/form-configuration.entity';
import { Repository } from 'typeorm';
import { GetFormsByGroupQueryDto } from './dtos/GetFormsByGroupQueryDto';

export class FormConfigsRepository extends Repository<FormConfiguration> {
  async getByForm(formId: string, { groupId = null }: GetFormsByGroupQueryDto) {
    return this.find({
      where: {
        formId,
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

  async getByGroup(groupId: string) {
    return this.find({
      where: {
        groupId,
      },
      relations: {
        form: true,
        schedules: true,
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        form: {
          id: true,
          name: true,
        }
      },
    });
  }
}
