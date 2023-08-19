import { Roles } from '@admin/roles/roles.enum';
import { StudyMember } from '@entities/study-member.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MembersRepository extends Repository<StudyMember> {
  async getByStudy(studyId: string) {
    return await this.find({
      where: { studyId },
      relations: {
        director: true,
      },
      select: {
        role: true,
        director: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });
  }

  public async getMemberOrFail(studyId: string, directorId: string) {
    return this.findOneOrFail({
      where: {
        directorId,
        studyId,
      },
    });
  }

  public async getAdminMembers(studyId: string) {
    return this.find({
      where: {
        studyId,
        role: Roles.admin,
      },
    });
  }

  public async isMemberLastAdmin(studyId: string, directorId: string) {
    const member = await this.getMemberOrFail(studyId, directorId);
    if (member.role === 'admin') {
      const adminMembers = await this.getAdminMembers(studyId);
      return adminMembers.length === 1;
    }
    return false;
  }
}
