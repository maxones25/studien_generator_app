import { Repository } from 'typeorm';
import { Study } from '@entities/study.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class StudiesRepository extends Repository<Study> {
  async getByDirector(directorId: string) {
    const studies = await this.createQueryBuilder('studies')
      .leftJoinAndSelect('studies.members', 'member')
      .where('member.directorId = :directorId', { directorId })
      .select(['studies.id', 'studies.name', 'member.role'])
      .orderBy('member.role', 'ASC')
      .getMany();

    return studies.map(({ id, name, members }) => ({
      id,
      name,
      role: members[0].role ?? 'employee',
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

    if(members.length !== 1) throw new InternalServerErrorException()

    return {
      id,
      name,
      role: members[0].role,
    };
  }
}
