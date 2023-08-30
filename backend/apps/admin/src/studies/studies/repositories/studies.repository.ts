import { Repository, DeepPartial } from 'typeorm';
import { Study } from '@entities/study.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';

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
        members: {
          role: true,
        },
      },
    });

    return studies.map(({ id, name, members }) => ({
      id,
      name,
      role: members[0].role,
    }));
  }

  async getOneByDirector(studyId: string, directorId: string) {
    const { id, name, members } = await this.db.findOneOrFail({
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
        members: {
          role: true,
        },
      },
    });

    return {
      id,
      name,
      role: members[0].role,
    };
  }
}
