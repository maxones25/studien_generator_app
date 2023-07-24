import { InjectRepository } from '@nestjs/typeorm';
import { StudyMember } from '../../../../entities/study-member.entity';
import { Repository } from 'typeorm';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export class StudyMemberGuard implements CanActivate {
  constructor(
    @InjectRepository(StudyMember)
    private readonly studyMembersRepository: Repository<StudyMember>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const directorId = request.params.directorId;

    if (!studyId) throw new UnauthorizedException();
    if (!directorId) true;

    const studyMember = await this.studyMembersRepository.findOne({
      where: {
        studyId,
        directorId,
      },
    });

    if (!studyMember) throw new UnauthorizedException();

    return true;
  }
}
