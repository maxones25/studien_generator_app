import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyMember } from '../../../entities/study-member.entity';
import { AddMemberDto } from './dtos/AddMemberDto';
import { UpdateMemberDto } from './dtos/UpdateMemberDto';
import { Roles } from '../../../enums/roles.enum';
import { StudyMembersRepository } from './study-members.repository';

@Injectable()
export class StudyMembersService {
  constructor(
    @InjectRepository(StudyMember)
    private studyMemberRepository: StudyMembersRepository,
  ) {}

  async addToStudy(studyId: string, { directorId, role }: AddMemberDto) {
    const studyMember = new StudyMember();

    studyMember.studyId = studyId;
    studyMember.directorId = directorId;
    studyMember.role = role;

    await this.studyMemberRepository.insert(studyMember);
  }

  async updateMember(
    studyId: string,
    directorId: string,
    { role }: UpdateMemberDto,
  ) {
    if (
      role === Roles.employee &&
      (await this.studyMemberRepository.isMemberLastAdmin(studyId, directorId))
    )
      throw new BadRequestException('can not remove last admin from study');

    return await this.studyMemberRepository.update(
      {
        studyId,
        directorId,
      },
      { role },
    );
  }

  async removeFromStudy(studyId: string, directorId: string) {
    if (await this.studyMemberRepository.isMemberLastAdmin(studyId, directorId))
      throw new BadRequestException('can not remove last admin from study');
    await this.studyMemberRepository.delete({
      directorId,
      studyId: studyId,
    });
  }

  async getByStudy(studyId: string) {
    return await this.studyMemberRepository.getByStudy(studyId);
  }
}
