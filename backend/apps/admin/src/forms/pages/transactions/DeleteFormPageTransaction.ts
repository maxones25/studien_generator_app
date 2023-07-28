import { DeleteResult, Repository } from 'typeorm';
import { FormPage } from '@entities/form-page.entity';
import { Transaction } from '@shared/modules/transaction/transaction';

export class DeleteFormPageTransaction extends Transaction<
  string,
  DeleteResult
> {
  private formPagesRepo: Repository<FormPage>;

  protected async execute(id: string): Promise<DeleteResult> {
    this.formPagesRepo = await this.entityManager.getRepository(FormPage);

    const formPage = await this.formPagesRepo.findOneOrFail({ where: { id } });

    const result = await this.formPagesRepo.delete(id);

    await this.updateNumberOfFormPages(formPage.formId);

    return result;
  }

  private async getFormPages(formId) {
    return this.formPagesRepo.find({
      where: { formId },
      order: {
        number: 'ASC',
      },
    });
  }

  private async updateNumberOfFormPages(formId: string) {
    const formPages = await this.getFormPages(formId);

    const updatedFormPages = formPages.map((formPage, i) => {
      formPage.number = i + 1;
      return formPage;
    });

    await this.formPagesRepo.save(updatedFormPages);
  }
}
