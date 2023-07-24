import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyMember } from '../../../entities/study-member.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(StudyMember)
    private studyMembersRepository: Repository<StudyMember>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest()

    if(!request?.payload) throw new UnauthorizedException()

    const { directorId } = request.payload;
    const studyId = request.params.studyId;

    if(!studyId) throw new BadRequestException("studyId required")

    const director = await this.studyMembersRepository.findOne({
      where: { directorId, studyId },
    });

    if (!director) throw new UnauthorizedException();

    if (!roles.includes(director.role)) throw new UnauthorizedException();

    return true;
  }
}
