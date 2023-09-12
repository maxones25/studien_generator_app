import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Participant } from '@entities';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { PasswordService } from '@shared/modules/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async checkCredentials({ id, password }: LoginParticipantDto) {
    
    console.log('test1', process.env.TEST)
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

    const accessToken = await this.jwtService.signAsync({
      participantId: participant.id,
      groupId: participant.groupId,
      studyId: participant.studyId,
      chatId: participant.chat.id,
      type: 'participant',
    });

    console.log('test2', process.env.TEST)

    if (!process.env.TEST) {
      const resetPassword = await this.passwordService.generateHashed(10)
  
      this.particpantsRepository.update(participant.id, {
        password: resetPassword
      })
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
