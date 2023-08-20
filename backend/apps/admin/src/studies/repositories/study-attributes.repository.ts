import { Repository } from 'typeorm';
import { StudyAttribute as StudyAttributeEntity } from '@entities';
import { StudyAttribute } from '../StudyAttribute';

export class StudyAttributesRepository extends Repository<StudyAttributeEntity> {
  async set(studyId: string, key: StudyAttribute, rawValue: any) {
    const value = JSON.stringify(rawValue) as any;
    await this.upsert(
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

  async get<T>(studyId: string, key: StudyAttribute) {
    const attribute = await this.findOne({
      where: {
        studyId,
        key,
      },
    });
    if (attribute === null) return null;
    return attribute.value as T;
  }

  async isSet(studyId: string, key: StudyAttribute) {
    return (await this.get(studyId, key)) !== null;
  }

  async getAll(studyId: string): Promise<{
    isActive: boolean;
    startDate: string | null;
    endDate: string | null;
    duration: number | null;
  }> {
    const attributes = await this.find({
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
