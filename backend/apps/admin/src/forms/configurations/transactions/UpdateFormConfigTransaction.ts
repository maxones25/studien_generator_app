import { Transaction } from '@shared/modules/transaction/transaction';
import { UpdateFormConfigurationDto } from '../dtos/UpdateFormConfigurationDto';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { Task } from '@entities/task.entity';
import { FormSchedule } from '@entities/form-schedule.entity';
import { MoreThanOrEqual } from 'typeorm';

type UpdateFormConfigInput = {
  id: string;
  data: UpdateFormConfigurationDto;
};

export class UpdateFormConfigTransaction extends Transaction<
  UpdateFormConfigInput,
  number
> {
  protected async execute({
    id,
    data,
  }: UpdateFormConfigInput): Promise<number> {
    const affected = await this.updateFormConfig(id, data);

    if (data.type === FormConfigType.TimeIndependent) {
      this.deleteTasks(id);
    }

    return affected;
  }

  private async updateFormConfig(id: string, data: UpdateFormConfigurationDto) {
    const repo = this.entityManager.getRepository(FormConfiguration);

    const { affected } = await repo.update(id, data);

    return affected;
  }

  private async deleteTasks(configId: string) {
    const schedulesRepo = this.entityManager.getRepository(FormSchedule);
  }

  private async getFormSchedules(configId: string) {
    const repo = this.entityManager.getRepository(FormSchedule);
    return repo.find({
      where: {
        configId,
        tasks: {
          scheduledAt: MoreThanOrEqual(new Date()),
        },
      },
      relations: { tasks: true },
      select: { id: true, tasks: { id: true } },
    });
  }
}
