import { StudyMemberSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMembersRepository, Member } from '@admin/members/domain';

export class MembersRepository implements IMembersRepository {
  constructor(
    @InjectRepository(StudyMemberSchema)
    private readonly db: Repository<StudyMemberSchema>,
  ) {}

  async addMember(member: Member): Promise<void> {
    await this.db.insert(member);
  }

  async getMembersByStudy(studyId: string): Promise<Member[]> {
    return await this.db.find({
      where: { studyId },
      relations: {
        director: true,
      },
      select: {
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
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

  async getMemberByStudy(studyId: string, directorId: string): Promise<Member> {
    return this.db.findOneBy({ studyId, directorId });
  }

  async changeMemberRole({
    studyId,
    directorId,
    role,
  }: Member): Promise<number> {
    const { affected } = await this.db.update(
      { studyId, directorId },
      { role },
    );
    return affected;
  }

  async removeMember(studyId: string, directorId: string): Promise<number> {
    const { affected } = await this.db.delete({ studyId, directorId });
    return affected;
  }

  async getRelatedByStudy(studyId: string, directorId: string) {
    return await this.db.findOne({
      where: {
        studyId,
        directorId,
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
        role: 'admin',
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
