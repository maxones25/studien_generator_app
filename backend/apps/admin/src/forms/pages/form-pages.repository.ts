import { FormPage } from '@entities/form-page.entity';
import { Repository } from 'typeorm';

export class FormPagesRepository extends Repository<FormPage> {

  async getAll(formId: string) {
    return this.find({
      where: { formId },
      select: {
        id: true,
        title: true,
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
    return formPages.length + 1
  }
}
