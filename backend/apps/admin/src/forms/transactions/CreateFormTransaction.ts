import { Transaction } from '@shared/modules/transaction/transaction';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Form } from '@entities/form.entity';
import { FormPage } from '@entities/form-page.entity';

type InputData = {
  studyId: string;
  data: CreateFormDto;
};

export class CreateFormTransaction extends Transaction<InputData, string> {
  protected async execute({ studyId, data }: InputData): Promise<string> {
    const id = await this.createFormPage(studyId, data);
    await this.addFormPage(id, data.name);
    return id;
  }

  private async createFormPage(studyId: string, { name }: CreateFormDto) {
    const repo = this.entityManager.getRepository(Form);
    const form = new Form();

    form.studyId = studyId;
    form.name = name;

    await repo.insert(form);

    return form.id;
  }

  private async addFormPage(formId: string, name: string) {
    const repo = this.entityManager.getRepository(FormPage);
    const formPage = new FormPage();

    formPage.formId = formId;
    formPage.number = 1;
    formPage.title = name;

    await repo.insert(formPage);

    return formPage.id;
  }
}
