import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyMember } from '../../entities/study-member';
import { AddMemberDto } from './dtos/addMemberDto';
import { UpdateMemberDto } from './dtos/updateMemberDto';
import { Roles } from '../../enums/roles.enum';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(StudyMember)
    private studyMemberRepository: Repository<StudyMember>,
  ) {}

  async addToStudy(studyId: string, { directorId, role }: AddMemberDto) {
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

  async removeFromStudy(studyId: string, directorId: string) {
    if (await this.checkAdmins(studyId, directorId))
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

  private async checkAdmins(
    studyId: string,
    directorId: string,
  ): Promise<boolean> {
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
