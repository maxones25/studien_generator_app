import { Participant, ParticipantsAttributes } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

export class ParticipantsRepository extends RecordRepository<Participant> {
  private readonly relations: FindOptionsRelations<Participant> = {
    group: true,
    attributes: true,
    chat: true,
  };

  private readonly select: FindOptionsSelect<Participant> = {
    id: true,
    number: true,
    group: {
      id: true,
      name: true,
    },
    chat: {
      id: true,
    },
    attributes: {
      key: true,
      value: true,
    },
  };

  constructor(
    @InjectRepository(Participant)
    db: Repository<Participant>,
  ) {
    super(db);
  }

  async getRelatedByStudy(studyId: string, id: string) {
    return await this.db.findOne({
      where: { id, studyId },
    });
  }

  async getById(id: string) {
    const participant = await this.db.findOneOrFail({
      where: { id },
      relations: this.relations,
      select: this.select,
    });
    return this.convertParticipant(participant);
  }

  async getByStudy(studyId: string) {
    const participants = await this.db.find({
      where: { studyId },
      order: {
        number: 'ASC',
      },
      relations: this.relations,
      select: this.select,
    });
    return participants.map(this.convertParticipant);
  }

  async getByGroup(groupId: string) {
    return await this.db.find({ where: { groupId } });
  }

  private convertParticipant(
    participant: Participant,
  ): Omit<Participant, 'attributes' | 'isDeleted'> & ParticipantsAttributes {
    const { attributes, ...data } = participant;
    return {
      ...data,
      ...attributes.reduce(
        (obj, { key, value }) => {
          obj[key] = value;
          return obj;
        },
        { startedAt: null, endedAt: null },
      ),
    };
  }
}
