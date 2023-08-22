import { FormComponent } from '@entities';
import { FormEntity } from '@entities/form-entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class ComponentsRepository extends RecordRepository<FormComponent> {
  constructor(
    @InjectRepository(FormComponent)
    db: Repository<FormComponent>,
  ) {
    super(db);
  }

  getById(id: string) {
    return this.db.findOne({ where: { id } });
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOne({ where: { id, page: { form: { studyId } } } });
  }

  async getByPage(pageId: string) {
    return this.db.find({
      where: { pageId },
      relations: {
        formFields: true,
        attributes: true,
      },
      select: {
        id: true,
        type: true,
        formFields: {
          entityFieldId: true,
        },
        attributes: {
          key: true,
          value: true,
        },
      },
      order: {
        number: 'ASC',
      },
    });
  }

  async getNextNumber(pageId: string) {
    const component = await this.db.find({
      where: { pageId },
    });
    return component.length + 1;
  }
}
