import { FormPage } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';
import { IPagesRepository } from '../domain/IPagesRepository';

export class PagesRepository
  extends RecordRepository<FormPage>
  implements IPagesRepository
{
  constructor(
    @InjectRepository(FormPage)
    db: Repository<FormPage>,
  ) {
    super(db);
  }
  async addPage(formId: string, number: number): Promise<string> {
    const page = new FormPage();

    page.formId = formId;
    page.number = number;

    await this.db.insert(page);

    return page.id;
  }

  getRelatedByStudy(studyId: string, id: string): any {
    return this.db.findOne({ where: { id, form: { studyId } } });
  }

  async getByForm(formId: string) {
    return this.db.find({
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
    const formPages = await this.db.find({
      where: { formId },
    });
    return formPages.length + 1;
  }

  async isLastPage(formId: string) {
    const pages = await this.db.find({ where: { formId } });
    return pages.length === 1;
  }
}
