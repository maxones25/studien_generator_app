import { Repository } from 'typeorm';
import { Study } from '@entities/study.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class StudiesRepository extends Repository<Study> {
  async getByDirector(directorId: string) {
    const studies = await this.find({
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
    const { id, name, members } = await this.findOneOrFail({
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
