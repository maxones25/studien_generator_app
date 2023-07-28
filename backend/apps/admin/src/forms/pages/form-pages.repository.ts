import { FormPage } from '@entities/form-page.entity';
import { Repository } from 'typeorm';

export class FormPagesRepository extends Repository<FormPage> {
  async getAll(formId: string) {
    return this.find({
      where: { formId },
      select: {
        id: true,
        number: true,
      },
      order: {
        number: 'ASC',
      },
    });
  }

  async getNextNumber(formId: string) {
    const formPages = await this.find({
      where: { formId },
    });
    return formPages.length + 1;
  }

  async isLastPage(formId: string) {
    const pages = await this.find({ where: { formId } })
    return pages.length === 1
  }
}
