import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StudyMember } from '@entities/study-member.entity';
import { Roles } from '@admin/roles/roles.enum';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(
    @Inject(MembersRepository)
    private memberRepository: MembersRepository,
  ) {}

  async add(studyId: string, directorId: string, role: Roles) {
    const studyMember = new StudyMember();

    studyMember.studyId = studyId;
    studyMember.directorId = directorId;
    studyMember.role = role;

    await this.memberRepository.insert(studyMember);
  }

  async changeRole(studyId: string, directorId: string, role: Roles) {
    if (
      role === Roles.employee &&
      (await this.memberRepository.isMemberLastAdmin(studyId, directorId))
    )
      throw new BadRequestException('can not remove last admin from study');

    return await this.memberRepository.update(
      {
        studyId,
        directorId,
      },
      { role },
    );
  }

  async remove(studyId: string, directorId: string) {
    if (await this.memberRepository.isMemberLastAdmin(studyId, directorId))
      throw new BadRequestException('can not remove last admin from study');
    
    await this.memberRepository.delete({
      directorId,
      studyId: studyId,
    });
  }

  async getByStudy(studyId: string) {
    return await this.memberRepository.getByStudy(studyId);
  }
}
