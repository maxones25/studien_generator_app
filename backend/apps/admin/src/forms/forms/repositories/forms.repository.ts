import { Injectable } from '@nestjs/common';
import { Form as FormSchema } from '@entities';
import { Repository } from 'typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FormConfiguration } from '@entities';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { IFormsRepository } from '../domain/IFormsRepository';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Form } from '@entities/core/form';

@Injectable()
export class FormsRepository
  extends RecordRepository<FormSchema>
  implements IFormsRepository
{
  constructor(
    @InjectRepository(FormSchema)
    db: Repository<FormSchema>,
  ) {
    super(db);
  }
  async createForm(studyId: string, { name }: CreateFormDto): Promise<string> {
    const form = new FormSchema();

    form.studyId = studyId;
    form.name = name;

    await this.db.insert(form);

    return form.id;
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOne({ where: { id, studyId } });
  }

  getNonGroup(studyId: string, groupId: string) {
    return this.db
      .createQueryBuilder('f')
      .select(['f.id', 'f.name'])
      .leftJoin(
        FormConfiguration,
        'fg1',
        'f.id = fg1.formId AND fg1.type = :independent AND fg1.groupId = :groupId',
        { groupId, independent: FormConfigType.TimeIndependent },
      )
      .leftJoin(
        FormConfiguration,
        'fg2',
        'f.id = fg2.formId AND fg2.type = :dependent AND fg2.groupId = :groupId',
        { groupId, dependent: FormConfigType.TimeDependent },
      )
      .where('f.study = :studyId AND (fg1.type IS NULL OR fg2.type IS NULL)', {
        studyId,
      })
      .getMany();
  }

  getAvailableForms(studyId: string, groupId: string): Promise<Form[]> {
    return this.db
      .createQueryBuilder('f')
      .select(['f.id', 'f.name'])
      .leftJoin(
        FormConfiguration,
        'fg1',
        'f.id = fg1.formId AND fg1.type = :independent AND fg1.groupId = :groupId',
        { groupId, independent: FormConfigType.TimeIndependent },
      )
      .leftJoin(
        FormConfiguration,
        'fg2',
        'f.id = fg2.formId AND fg2.type = :dependent AND fg2.groupId = :groupId',
        { groupId, dependent: FormConfigType.TimeDependent },
      )
      .where('f.study = :studyId AND (fg1.type IS NULL OR fg2.type IS NULL)', {
        studyId,
      })
      .getMany();
  }

  getByEntity(entityId: string) {
    return this.db.find({
      where: { formEntities: { entityId } },
      relations: {
        formEntities: true,
      },
      select: { id: true, name: true, formEntities: { id: true, name: true } },
    });
  }

  getAll(studyId: string) {
    return this.db.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  getById(id: string) {
    return this.db.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
