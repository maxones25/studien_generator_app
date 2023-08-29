import {
  Participant,
  ParticipantAttribute,
  ParticipantsAttributes,
} from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AttributeKey,
  AttributeValue,
  AttritbuteRepository,
} from '@shared/modules/records/attribute.repository';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class AttributesRepository
  implements AttritbuteRepository<ParticipantsAttributes>
{
  constructor(
    @InjectRepository(ParticipantAttribute)
    private readonly db: Repository<ParticipantAttribute>,
  ) {}

  async get<Key extends AttributeKey<ParticipantsAttributes>>(
    participantId: string,
    key: Key,
  ): Promise<AttributeValue<ParticipantsAttributes, Key>> {
    const attribute = await this.db.findOne({ where: { participantId, key } });
    if (attribute.value === null) return null;
    return attribute.value;
  }

  async set<Key extends AttributeKey<ParticipantsAttributes>>(
    participantId: string,
    key: Key,
    rawValue: AttributeValue<ParticipantsAttributes, Key>,
  ): Promise<void> {
    const value = JSON.stringify(rawValue) as any;
    await this.db.upsert(
      { participantId, key, value },
      { conflictPaths: { participantId: true, key: true } },
    );
  }
  async remove<Key extends keyof ParticipantsAttributes>(
    participantId: string,
    key: Key,
  ): Promise<number> {
    const { affected } = await this.db.delete({ participantId, key });
    return affected;
  }

  async isSet(
    participantId: string,
    key: keyof ParticipantsAttributes,
  ): Promise<boolean> {
    const value = await this.get(participantId, key);
    return value !== null;
  }

  async getAll(participantId: string): Promise<ParticipantsAttributes> {
    const attributes = await this.db.find({ where: { participantId } });
    return attributes.reduce((obj, { key, value }) => {
      obj[key] = value;
      return obj;
    }, {}) as ParticipantsAttributes;
  }

  removeAll(id: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
