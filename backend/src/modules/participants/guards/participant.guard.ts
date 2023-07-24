import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Participant } from '../../../entities/participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Injectable()
export class ParticipantGuard implements CanActivate {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const participantId = request.params.participantId;

    if (!studyId) throw new UnauthorizedException();
    if (!participantId) return true;

    const participant = await this.participantsRepository.findOne({
      where: { studyId, id: participantId },
    });

    if (!participantId) throw new UnauthorizedException();

    return true;
  }
}
