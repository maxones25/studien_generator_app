import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Participant } from '../../../entities/participant.entity';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { PasswordService } from '../password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async checkCredentials({ id, password }: LoginParticipantDto) {
    const participant = await this.particpantsRepository.findOne({
      where: {
        id,
      },
    });

    if (!participant) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, participant.password)))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      participantId: participant.id,
      groupId: participant.groupId,
      studyId: participant.studyId,
      type: 'participant',
    });

    return {
      accessToken,
    };
  }
}
