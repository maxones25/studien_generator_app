import { FormPage } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class PagesRepository extends RecordRepository<FormPage> {
  constructor(
    @InjectRepository(FormPage)
    db: Repository<FormPage>,
  ) {
    super(db);
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
