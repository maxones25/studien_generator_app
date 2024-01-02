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

  async checkCredentials({ loginId, password }: LoginParticipantDto) {
    const [ studyName, number ] = loginId.split('-');
    const participants = await this.particpantsRepository.find({
      where: {
        number,
      },
      relations: {
        chat: true,
        study: true,
      },
      select: {
        chat: {
          id: true,
        },
        study: {
          id: true,
          name: true,
        }
      },
    });

    const participant = participants.find(participant => participant.study.name === studyName);

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

/*     if (!process.env.TEST) {
      const password = this.passwordService.generate();
      const resetPassword = await this.passwordService.hash(password);


    } */

    return {
      accessToken,
    };
  }

  async changePassword(participantId: string, oldPassword: string, newPassword: string) {
    const participant = await this.particpantsRepository.findOne({where: {id: participantId}});
    if (!await this.passwordService.compare(oldPassword, participant.password))
      throw new UnauthorizedException();
    const hashedPassword = await this.passwordService.hash(newPassword);
    this.particpantsRepository.update(participantId, {
      password: hashedPassword,
    });
  }

  async isDeleted(id: string) {
    const entity = await this.particpantsRepository.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }
}
