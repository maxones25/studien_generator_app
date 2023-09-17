import { StudyMember } from '@entities';
import { Roles } from '@entities/core/study';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MembersRepository extends RecordRepository<StudyMember> {
  constructor(
    @InjectRepository(StudyMember)
    db: Repository<StudyMember>,
  ) {
    super(db);
  }

  async getRelatedByStudy(studyId: string, directorId: string) {
    return await this.db.findOne({
      where: {
        studyId,
        directorId,
      },
    });
  }

  async getByStudy(studyId: string) {
    return await this.db.find({
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
    return this.db.findOneOrFail({
      where: {
        directorId,
        studyId,
      },
    });
  }

  public async getAdminMembers(studyId: string) {
    return this.db.find({
      where: {
        studyId,
        role: Roles.Admin,
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
