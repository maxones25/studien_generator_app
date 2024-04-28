import { Form, FormComponent, FormComponentAttribute } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { UpdateComponentSequenceDto } from '../dtos/UpdateComponentSequenceDto';

type CreateFormTransactionInput = {
  data: UpdateComponentSequenceDto;
  formId: string;
};

export class UpdateComponentSequenceTransaction extends Transaction<
  CreateFormTransactionInput,
  string
> {
  protected async execute({
    data,
    formId,
  }: CreateFormTransactionInput): Promise<any> {

  const formRepo = await this.entityManager.getRepository(Form);
  await formRepo.update({id: formId}, {modifiedAt: new Date()});

  const { components } = data
  const formComponentsRepo = await this.entityManager.getRepository(FormComponent);

  components.map(({id}, index) => {
    
    formComponentsRepo.update(id, {number: index + 1 })
  })
  return;
  } 
}
