import { FormField } from '@entities';
import { FormComponent } from '@entities';
import { FormComponentAttribute } from '@entities';
import {
  CreateFormComponentDto,
  FormFieldDto,
} from '../dtos/CreateFormComponentDto';
import { FormComponentAttributeDto } from '../dtos/FormComponentAttributeDto';
import { Transaction } from '@shared/modules/transaction/transaction';

type CreateFormTransactionInput = {
  pageId: string;
  number: number;
  data: CreateFormComponentDto;
};

export class AddComponentTransaction extends Transaction<
  CreateFormTransactionInput,
  string
> {
  protected async execute({
    pageId,
    number,
    data,
  }: CreateFormTransactionInput): Promise<string> {
    const formComponent = await this.createFormComponent(pageId, number, data);

    await this.addFormFields(formComponent.id, data.formFields);
    await this.addAttributes(formComponent.id, data.attributes);

    return formComponent.id;
  }

  private async createFormComponent(
    pageId: string,
    number: number,
    { type }: CreateFormComponentDto,
  ) {
    const formComponentsRepo = await this.entityManager.getRepository(
      FormComponent,
    );

    const formComponent = new FormComponent();

    formComponent.pageId = pageId;
    formComponent.number = number;
    formComponent.type = type;

    await formComponentsRepo.insert(formComponent);

    return formComponent;
  }

  private async addFormFields(
    formComponentId: string,
    formFields: FormFieldDto[],
  ) {
    const formFieldsRepo = await this.entityManager.getRepository(FormField);

    for (const { entityId, fieldId } of formFields) {
      const formField = new FormField();

      formField.entityId = entityId;
      formField.entityFieldId = fieldId;
      formField.formComponentId = formComponentId;

      await formFieldsRepo.insert(formField);
    }
  }

  private async addAttributes(
    formComponentId: string,
    attributes: Record<string, any>,
  ) {
    const formComponentAttributesRepo = await this.entityManager.getRepository(
      FormComponentAttribute,
    );

    for (const key in attributes) {
      const attribute = new FormComponentAttribute();

      attribute.componentId = formComponentId;
      attribute.key = key;
      attribute.value = JSON.stringify(attributes[key]);

      await formComponentAttributesRepo.insert(attribute);
    }
  }
}
