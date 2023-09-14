import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '@entities';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { PasswordService } from '@shared/modules/password/password.service';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    @Inject(TOKEN_SERVICE)
    private tokenService: ITokenService,
    private passwordService: PasswordService,
  ) {}

  async checkCredentials({ id, password }: LoginParticipantDto) {
    const participant = await this.particpantsRepository.findOne({
      where: {
        id,
      },
      relations: {
        chat: true,
      },
      select: {
        chat: {
          id: true,
        },
      },
    });

    if (!participant) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, participant.password)))
      throw new UnauthorizedException();

    const accessToken = await this.tokenService.sign({
      participantId: participant.id,
      groupId: participant.groupId,
      studyId: participant.studyId,
      chatId: participant.chat.id,
      type: 'participant',
    });

    if (!process.env.TEST) {
      const resetPassword = await this.passwordService.generateHashed(10);

      this.particpantsRepository.update(participant.id, {
        password: resetPassword,
      });
    }

    return {
      accessToken,
    };
  }

  async isDeleted(id: string) {
    const entity = await this.particpantsRepository.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }
}
