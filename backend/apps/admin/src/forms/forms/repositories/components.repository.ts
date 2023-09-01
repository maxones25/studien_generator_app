import { FormComponent } from '@entities';
import { FormEntity } from '@entities';
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
    const components = await this.db.find({
      where: { pageId },
      relations: {
        formFields: {
          entityField: true,
        },
        attributes: true,
      },
      select: {
        id: true,
        type: true,
        formFields: {
          id: true,
          entityField: {
            id: true,
          },
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

    return components.map((component) => ({
      ...component,
      attributes: component.attributes.reduce<Record<string, any>>(
        (obj, { key, value }) => {
          obj[key] = value;
          return obj;
        },
        {},
      ),
    }));
  }

  async getNextNumber(pageId: string) {
    const component = await this.db.find({
      where: { pageId },
    });
    return component.length + 1;
  }
}
