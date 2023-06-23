import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { StudyMember } from '../../entities/study-member';
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Roles } from '../../enums/roles.enum';

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
    await this.studiesRepository.insert(study);
    await this.studyMemberRepository.insert({
      directorId: directorId,
      studyId: study.id,
      role: Roles.admin,
    });
    return study;
  }

  findAll(): Promise<Study[]> {
    return this.studiesRepository.find();
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

  async addMember(
    studyId: string,
    { directorId, role }: AddMemberDto,
  ) {
    return await this.studyMemberRepository.insert({
      directorId,
      studyId: studyId,
      role,
    });
  }

  async updateMember(
    studyId: string,
    directorId: string,
    { role }: UpdateMemberDto,
  ) {
    if (await this.checkAdmins(studyId, directorId))
      await this.studyMemberRepository.update(
        {
          studyId,
          directorId,
        },
        {
          role,
        },
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
      }
    })
    if (member.role === 'admin') {
      const adminMembers = await this.studyMemberRepository.find({
        where: {
          studyId,
          role: Roles.admin,
        },
      });
      if (adminMembers.length === 1) 
        throw new ConflictException('can not delete/change last admin');;
    }
    return true;
  }
}
