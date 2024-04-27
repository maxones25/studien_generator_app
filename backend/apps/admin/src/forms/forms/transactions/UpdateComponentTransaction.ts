import { Form, FormComponentAttribute } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';

type CreateFormTransactionInput = {
  id: string;
  formId: string;
  attributes: Record<string, any>;
};

export class UpdateComponentTransaction extends Transaction<
  CreateFormTransactionInput,
  string
> {
  protected async execute({
    id,
    attributes,
    formId,
  }: CreateFormTransactionInput): Promise<string> {

    const formRepo = await this.entityManager.getRepository(Form);
    await formRepo.update({id: formId}, {modifiedAt: new Date()});

    await this.addAttributes(id, attributes);

    return id;
  }

  private async addAttributes(
    formComponentId: string,
    attributes: Record<string, any>,
  ) {
    const formComponentAttributesRepo = await this.entityManager.getRepository(
      FormComponentAttribute,
    );

    await formComponentAttributesRepo.delete({componentId: formComponentId})

    for (const key in attributes) {
      const attribute = new FormComponentAttribute();

      attribute.componentId = formComponentId;
      attribute.key = key;
      attribute.value = JSON.stringify(attributes[key]);

      await formComponentAttributesRepo.insert(attribute);
    }
  }
}
