import { FormField } from '@entities/form-field.entity';
import { FormComponent } from '@entities/form-component.entity';
import { FormComponentAttribute } from '@entities/form-component-attribute.entity';
import {
  CreateFormComponentDto,
  FormFieldDto,
} from '../dtos/CreateFormComponentDto';
import { FormComponentAttributeDto } from '../attributes/dtos/FormComponentAttributeDto';
import { Transaction } from '@shared/modules/transaction/transaction';

type CreateFormTransactionInput = {
  pageId: string;
  number: number;
  data: CreateFormComponentDto;
};

export class CreateFormComponentTransaction extends Transaction<
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

    console.table({ pageId, number, type })

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

      
      console.table(formField)
      await formFieldsRepo.insert(formField);
      console.table("done")
    }
  }

  private async addAttributes(
    formComponentId: string,
    attributes: FormComponentAttributeDto[],
  ) {
    const formComponentAttributesRepo = await this.entityManager.getRepository(
      FormComponentAttribute,
    );

    for (const { key, value } of attributes) {
      const attribute = new FormComponentAttribute();

      attribute.componentId = formComponentId;
      attribute.key = key;
      attribute.value = JSON.stringify(value);

      await formComponentAttributesRepo.insert(attribute);
    }
  }
}
