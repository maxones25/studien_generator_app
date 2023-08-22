import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StudyMember } from '@entities/study-member.entity';
import { Roles } from '@admin/roles/roles.enum';
import { MembersRepository } from './members.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class MembersService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(MembersRepository)
    private membersRepository: MembersRepository,
  ) {}

  async getRelatedByStudy(studyId: string, directorId: string): Promise<any> {
    return await this.membersRepository.getRelatedByStudy(studyId, directorId);
  }

  async add(studyId: string, directorId: string, role: Roles) {
    await this.membersRepository.create({ studyId, directorId, role });
  }

  async changeRole(studyId: string, directorId: string, role: Roles) {
    if (
      role === Roles.employee &&
      (await this.membersRepository.isMemberLastAdmin(studyId, directorId))
    )
      throw new BadRequestException('can not remove last admin from study');

    return await this.membersRepository.update(
      {
        studyId,
        directorId,
      },
      { role },
    );
  }

  async remove(studyId: string, directorId: string) {
    if (await this.membersRepository.isMemberLastAdmin(studyId, directorId))
      throw new BadRequestException('can not remove last admin from study');

    await this.membersRepository.delete({
      directorId,
      studyId: studyId,
    });
  }

  async getByStudy(studyId: string) {
    return await this.membersRepository.getByStudy(studyId);
  }
}
