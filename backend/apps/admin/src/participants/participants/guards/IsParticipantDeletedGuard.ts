import {
  CanActivate,
  Inject,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ParticipantsService } from '../participants.service';

@Injectable()
export class IsParticipantDeletedGuard implements CanActivate {
  constructor(
    @Inject(ParticipantsService)
    private readonly participantsService: ParticipantsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const id = this.getParticipantId(request);

    const isDeleted = await this.participantsService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException('participant is deleted');

    return true;
  }

  private getParticipantId(request: Request) {
    if (typeof request.query.participantId === 'string')
      return request.query.participantId;
    throw new UnauthorizedException();
  }
}
