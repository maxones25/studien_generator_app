import { Repository } from 'typeorm';
import { Study } from '@entities/study.entity';

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
    const study = await this.findOneOrFail({
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
      ...study,
      role: study.members[0]?.role ?? '',
    };
  }
}
