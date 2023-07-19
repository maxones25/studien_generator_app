import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyMember } from '../../../entities/study-member';
import { AddMemberDto } from './dtos/AddMemberDto';
import { UpdateMemberDto } from './dtos/UpdateMemberDto';
import { Roles } from '../../../enums/roles.enum';

@Injectable()
export class StudyMembersService {
  constructor(
    @InjectRepository(StudyMember)
    private studyMemberRepository: Repository<StudyMember>,
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
      (await this.isMemberLastAdmin(studyId, directorId))
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
    if (await this.isMemberLastAdmin(studyId, directorId))
      throw new BadRequestException('can not remove last admin from study');
    await this.studyMemberRepository.delete({
      directorId,
      studyId: studyId,
    });
  }

  async getByStudy(studyId: string) {
    return await this.studyMemberRepository.find({
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

  private async isMemberLastAdmin(studyId: string, directorId: string) {
    const member = await this.getMember(studyId, directorId);
    if (member.role === 'admin') {
      const adminMembers = await this.getAdminMembers(studyId);
      return adminMembers.length === 1;
    }
    return false;
  }

  private async getMember(studyId: string, directorId: string) {
    return this.studyMemberRepository.findOneOrFail({
      where: {
        directorId,
        studyId,
      },
    });
  }

  private async getAdminMembers(studyId: string) {
    return this.studyMemberRepository.find({
      where: {
        studyId,
        role: Roles.admin,
      },
    });
  }
}
