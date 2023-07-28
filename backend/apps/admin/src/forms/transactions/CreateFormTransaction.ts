import { Transaction } from '@shared/modules/transaction/transaction';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Form } from '@entities/form.entity';
import { FormPage } from '@entities/form-page.entity';
import { CreateFormEntityDto } from '@admin/forms/entities/dtos/CreateFormEntityDto';
import { FormEntity } from '@entities';

type InputData = {
  studyId: string;
  data: CreateFormDto;
};

export class CreateFormTransaction extends Transaction<InputData, string> {
  protected async execute({ studyId, data }: InputData): Promise<string> {
    const id = await this.createForm(studyId, data);
    await this.addFormPage(id);
    await this.createFormEntities(id, data.entities);
    return id;
  }

  private async createForm(studyId: string, { name }: CreateFormDto) {
    const repo = this.entityManager.getRepository(Form);
    const form = new Form();

    form.studyId = studyId;
    form.name = name;

    await repo.insert(form);

    return form.id;
  }

  private async addFormPage(formId: string) {
    const repo = this.entityManager.getRepository(FormPage);
    const formPage = new FormPage();

    formPage.formId = formId;
    formPage.number = 1;

    await repo.insert(formPage);

    return formPage.id;
  }

  private async createFormEntities(
    formId: string,
    entities?: CreateFormEntityDto[],
  ) {
    if (!entities) return;

    const repo = this.entityManager.getRepository(FormEntity);

    for (const { entityId, name } of entities) {
      const formEntity = new FormEntity();

      formEntity.formId = formId;
      formEntity.entityId = entityId;
      formEntity.name = name;

      await repo.insert(formEntity);
    }
  }
}
