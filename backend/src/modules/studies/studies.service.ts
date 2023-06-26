import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { StudyMember } from '../../entities/study-member';
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Roles } from '../../enums/roles.enum';
import { UpdateStudyDto } from './dtos/updateStudyDto';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
    @InjectRepository(StudyMember)
    private studyMemberRepository: Repository<StudyMember>,
  ) {}

  async create({ name }: CreateStudyDto, directorId: string) {
    const study = new Study();
    study.name = name;

    try {
      await this.studiesRepository.insert(study);

      await this.studyMemberRepository.insert({
        directorId: directorId,
        studyId: study.id,
        role: Roles.admin,
      });

      return study;
    } catch (error) {
      throw new ConflictException('study can not be created');
    }
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

  findOne(id: string): Promise<Study | null> {
    return this.studiesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(studyId: string): Promise<void> {
    await this.studiesRepository.delete(studyId);
  }

  async addMember(studyId: string, { directorId, role }: AddMemberDto) {
    return await this.studyMemberRepository.insert({
      directorId,
      studyId: studyId,
      role,
    });
  }

  async updateMember(
    studyId: string,
    directorId: string,
    updatedMember: UpdateMemberDto,
  ) {
    if (await this.checkAdmins(studyId, directorId))
      await this.studyMemberRepository.update(
        {
          studyId,
          directorId,
        },
        updatedMember,
      );
  }

  async removeMember(studyId: string, directorId: string) {
    if (await this.checkAdmins(studyId, directorId))
      await this.studyMemberRepository.delete({
        directorId,
        studyId: studyId,
      });
  }

  async checkAdmins(studyId: string, directorId: string): Promise<boolean> {
    const member = await this.studyMemberRepository.findOne({
      where: {
        directorId,
        studyId,
      },
    });
    if (member.role === 'admin') {
      const adminMembers = await this.studyMemberRepository.find({
        where: {
          studyId,
          role: Roles.admin,
        },
      });
      if (adminMembers.length === 1)
        throw new ConflictException('can not delete/change last admin');
    }
    return true;
  }
}
