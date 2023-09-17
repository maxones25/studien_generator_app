import { Participant, ParticipantsAttributes } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import {
  FindOptionsRelations,
  FindOptionsSelect,
  IsNull,
  Repository,
} from 'typeorm';

export class ParticipantsRepository extends RecordRepository<Participant> {
  private readonly relations: FindOptionsRelations<Participant> = {
    group: true,
    attributes: true,
    chat: true,
  };

  private readonly select: FindOptionsSelect<Participant> = {
    id: true,
    number: true,
    deletedAt: true,
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

  async getByStudy(studyId: string, deleted: boolean = false) {
    const deletedAt = deleted ? undefined : IsNull();
    const participants = await this.db.find({
      where: {
        studyId,
        deletedAt,
      },
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

  async removeGroup(id: string) {
    return this.db.update(id, { groupId: null });
  }

  async hardDeleteByGroup(groupId: string) {
    return this.hardDelete({ groupId });
  }

  async softDeleteByGroup(groupId: string) {
    return this.softDelete({ groupId });
  }

  private convertParticipant(
    participant: Participant,
  ): Participant & ParticipantsAttributes {
    return {
      ...participant,
      ...participant.attributes.reduce(
        (obj, { key, value }) => {
          obj[key] = value;
          return obj;
        },
        { startedAt: null, endedAt: null },
      ),
    };
  }

  removeGroupByGroup(groupId: string) {
    return this.update({ groupId }, { group: null });
  }
}
