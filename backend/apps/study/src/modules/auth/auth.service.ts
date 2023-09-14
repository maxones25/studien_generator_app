import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '@entities';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    @Inject(TOKEN_SERVICE)
    private tokenService: ITokenService,
    @Inject(PASSWORD_SERVICE)
    private passwordService: IPasswordService,
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
      const password = this.passwordService.generate();
      const resetPassword = await this.passwordService.hash(password);

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
