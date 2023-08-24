import { Injectable } from '@nestjs/common';
import { Form } from '@entities/form.entity';
import { Repository } from 'typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormsRepository extends RecordRepository<Form> {
  constructor(
    @InjectRepository(Form)
    db: Repository<Form>,
  ) {
    super(db);
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOne({ where: { id, studyId } });
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
