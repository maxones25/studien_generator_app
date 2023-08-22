import { Transaction } from '@shared/modules/transaction/transaction';
import { ComponentsRepository } from '../repositories/components.repository';
import { FormComponent } from '@entities';

type RemoveComponentInput = {
  id: string;
  pageId: string;
};

export class RemoveComponentTransaction extends Transaction<
  RemoveComponentInput,
  number
> {
  protected async execute({
    id,
    pageId,
  }: RemoveComponentInput): Promise<number> {
    const repo = await new ComponentsRepository(
      this.entityManager.getRepository(FormComponent),
    );

    const affected = await repo.delete(id);

    const components = await repo.getByPage(pageId);

    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      const number = i + 1;

      await repo.update(component.id, { number });
    }

    return affected;
  }
}
