import { Injectable, ConflictException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { UpdateStudyDto } from './dtos/updateStudyDto';
import { CreateStudyTransaction } from './transactions/create-study.transaction';

@Injectable()
export class StudiesService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
  ) {}

  async create(data: CreateStudyDto, directorId: string) {
    return new CreateStudyTransaction(this.entityManager).run({
      directorId,
      data,
    });
  }

  update(id: string, { name }: UpdateStudyDto) {
    return this.studiesRepository.update(id, { name });
  }

  async getByDirector(directorId: string) {
    const studies = await this.studiesRepository
      .createQueryBuilder('studies')
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

  async findOne(studyId: string, directorId: string) {
    const study = await this.studiesRepository.findOne({
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

    if (!study) throw new ConflictException('study not found');

    return {
      ...study,
      role: study.members[0]?.role ?? '',
    };
  }

  async delete(studyId: string) {
    return this.studiesRepository.delete(studyId);
  }
}
