import { Injectable, ConflictException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { StudyMember } from '../../entities/study-member';
import { Roles } from '../../enums/roles.enum';
import { UpdateStudyDto } from './dtos/updateStudyDto';

@Injectable()
export class StudiesService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
  ) {}

  async create({ name }: CreateStudyDto, directorId: string) {
    return await this.entityManager.transaction(async (entityManager) => {
      const studiesRepository = entityManager.getRepository(Study);
      const studyMemberRepository = entityManager.getRepository(StudyMember);

      const study = new Study();
      study.name = name;

      await studiesRepository.insert(study);

      await studyMemberRepository.insert({
        directorId: directorId,
        studyId: study.id,
        role: Roles.admin,
      });

      return study;
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

  async delete(studyId: string): Promise<void> {
    await this.studiesRepository.delete(studyId);
  }
}
