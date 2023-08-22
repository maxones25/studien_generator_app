import { Repository } from 'typeorm';
import {
  StudyAttribute as StudyAttributeEntity,
  StudyAttributes,
} from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AttributeKey,
  AttributeValue,
  AttritbuteRepository,
} from '@shared/modules/records/attribute.repository';

export class StudyAttributesRepository
  implements AttritbuteRepository<StudyAttributes>
{
  constructor(
    @InjectRepository(StudyAttributeEntity)
    private readonly db: Repository<StudyAttributeEntity>,
  ) {}

  async set<Key extends AttributeKey<StudyAttributes>>(
    studyId: string,
    key: Key,
    rawValue: AttributeValue<StudyAttributes, Key>,
  ): Promise<void> {
    const value = JSON.stringify(rawValue) as any;
    await this.db.upsert(
      {
        studyId,
        key,
        value,
      },
      {
        conflictPaths: {
          studyId: true,
          key: true,
        },
      },
    );
  }

  async get<Key extends AttributeKey<StudyAttributes>>(
    studyId: string,
    key: Key,
  ): Promise<AttributeValue<StudyAttributes, Key>> {
    const attribute = await this.db.findOne({
      where: {
        studyId,
        key,
      },
    });
    if (attribute === null) return null;
    return attribute.value as AttributeValue<StudyAttributes, Key>;
  }

  async isSet(studyId: string, key: AttributeKey<StudyAttributes>) {
    return (await this.get(studyId, key)) !== null;
  }

  async getAll(studyId: string): Promise<StudyAttributes> {
    const attributes = await this.db.find({
      where: { studyId },
    });

    return attributes.reduce(
      (obj, attribute) => {
        obj[attribute.key] = attribute.value;
        return obj;
      },
      {
        isActive: false,
        startDate: null,
        endDate: null,
        duration: null,
      },
    );
  }
}
