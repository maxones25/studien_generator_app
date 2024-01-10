import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Participant, ParticipantAttribute } from '@entities';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';
import { ParticipantsService } from '@admin/participants/participants/participants.service';

@Injectable()
export class AuthService {
  private readonly participantsService: ParticipantsService;

  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    @Inject(TOKEN_SERVICE)
    private tokenService: ITokenService,
    @Inject(PASSWORD_SERVICE)
    private passwordService: IPasswordService,
    @InjectEntityManager()
    private em: EntityManager,
  ) {
    this.participantsService = ParticipantsService.build(this.em, passwordService);
  }

  async checkCredentials({ loginId, password }: LoginParticipantDto) {
    const [ studyName, number ] = loginId.split('-');
    const participants = await this.particpantsRepository.find({
      where: {
        number,
      },
      relations: {
        chat: true,
        study: true,
        attributes: true,
      },
      select: {
        chat: {
          id: true,
        },
        study: {
          id: true,
          name: true,
        },
        attributes: {
          key: true,
          value: true,
        }
      },
    });

    const participant = participants.find(participant => participant.study.name === studyName);

    if (!participant) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, participant.password)))
      throw new UnauthorizedException();

    const payload = {
      participantId: participant.id,
      type: 'participant',
      groupId: participant.groupId,
      studyId: participant.studyId,
      chatId: participant.chat.id,
      isInitial: false,
    }

    if (participant.attributes.find(attribute => attribute.key === 'isInitial')?.value === 'true') 
      payload.isInitial = true;

    const accessToken = await this.tokenService.sign(payload);

    return {
      accessToken,
    };
  }

  async iniateAccount(participantId: string, newPassword: string) {
    const participant = await this.particpantsRepository.findOne({
      where: {id: participantId},
      relations: {
        chat: true
      },
      select: {
        chat: {
          id: true,
        }
      }
    });

    const hashedPassword = await this.passwordService.hash(newPassword);
    await this.particpantsRepository.update(participantId, {
      password: hashedPassword,
    });

    await this.participantsService.setIsInitial(participantId, false);

    const accessToken = await this.tokenService.sign({
      participantId: participant.id,
      groupId: participant.groupId,
      studyId: participant.studyId,
      chatId: participant.chat.id,
      type: 'participant',
      isInitial: false,
    });

    return {
      accessToken,
    };
  }

  async changePassword(participantId: string, oldPassword: string, newPassword: string) {
    const participant = await this.particpantsRepository.findOne({where: {id: participantId}});
    if (!await this.passwordService.compare(oldPassword, participant.password))
      throw new UnauthorizedException();
    const hashedPassword = await this.passwordService.hash(newPassword);
    await this.particpantsRepository.update(participantId, {
      password: hashedPassword,
    });
  }

  async isDeleted(id: string) {
    const entity = await this.particpantsRepository.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }
}
