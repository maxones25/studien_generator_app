import { Repository, DeepPartial } from 'typeorm';
import { Study } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import datetime from '@shared/modules/datetime/datetime';

@Injectable()
export class StudiesRepository extends RecordRepository<Study> {
  constructor(
    @InjectRepository(Study)
    db: Repository<Study>,
  ) {
    super(db);
  }

  async getById(id: string) {
    return await this.db.findOne({ where: { id } });
  }

  async getByDirector(directorId: string) {
    const studies = await this.db.find({
      where: {
        members: {
          directorId,
        },
      },
      relations: {
        members: true,
      },
      select: {
        id: true,
        name: true,
        deletedAt: true,
        members: {
          role: true,
        },
      },
    });

    return studies.map(({ id, name, members, deletedAt }) => ({
      id,
      name,
      deletedAt,
      role: members[0].role,
    }));
  }

  async getOneByDirector(studyId: string, directorId: string) {
    const { id, name, deletedAt, members } = await this.db.findOneOrFail({
      where: {
        id: studyId,
        members: {
          directorId,
        },
      },
      relations: {
        members: true,
      },
      select: {
        id: true,
        name: true,
        deletedAt: true,
        members: {
          role: true,
        },
      },
    });

    return {
      id,
      name,
      deletedAt,
      role: members[0].role,
    };
  }

  async softDelete(id: string) {
    const deletedAt = datetime.isoDateTime();
    return await this.db.update(id, { deletedAt });
  }

  async restore(id: string) {
    return await this.db.update(id, { deletedAt: null });
  }

  async isDeleted(id: string) {
    const study = await this.db.findOneBy({ id });
    if (!study) return true;
    return study.isDeleted;
  }
}
