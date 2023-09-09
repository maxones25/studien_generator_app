import { EntityField, FormEntity, Record } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { RecordsQueryDto } from './dtos/RecordsQueryDto';

export type TransformedRecordField = {
  id: string;
  value: any;
  entity: FormEntity;
  field: EntityField;
};

export type TransformedRecord = Omit<Record, 'fields'> & {
  isFailed: boolean;
  fields: globalThis.Record<string, TransformedRecordField>;
};

export class RecordsRepository extends RecordRepository<Record> {
  private relations: FindOptionsRelations<Record> = {
    form: true,
    task: true,
    participant: {
      group: true,
    },
    fields: {
      formField: {
        entity: true,
        entityField: true,
      },
    },
  };

  private select: FindOptionsSelect<Record> = {
    id: true,
    createdAt: true,
    failureReason: true,
    form: {
      id: true,
      name: true,
    },
    participant: {
      id: true,
      number: true,
      group: {
        id: true,
        name: true,
      },
    },
    task: {
      id: true,
      originalScheduledAt: true,
      scheduledAt: true,
      completedAt: true,
    },
    fields: {
      id: true,
      value: true,
      formField: {
        id: true,
        entity: {
          id: true,
          name: true,
        },
        entityField: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  };

  constructor(
    @InjectRepository(Record)
    db: Repository<Record>,
  ) {
    super(db);
  }

  async get(
    studyId: string,
    { entityId, participantId, groupId, formId }: RecordsQueryDto,
  ) {
    const records = await this.db.find({
      where: {
        participantId,
        formId,
        participant: {
          studyId,
          groupId,
        },
        fields: {
          formField: {
            entity: {
              entityId,
            },
          },
        },
      },
      relations: this.relations,
      select: this.select,
    });
    return this.transform(records);
  }

  private transform(records: Record[]): TransformedRecord[] {
    return records.map((record) => {
      return {
        ...record,
        isDeleted: record.deletedAt !== null,
        isFailed: record.isFailed,
        fields: record.fields.reduce<
          globalThis.Record<string, TransformedRecordField>
        >((fields, field) => {
          fields[field.formField.id] = {
            id: field.id,
            value: field.value,
            entity: field.formField.entity,
            field: field.formField.entityField,
          };
          return fields;
        }, {}),
      };
    });
  }
}
