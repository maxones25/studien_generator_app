import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate } from 'generate-password';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Participant } from '@entities';
import { LoginParticipantDto } from '@modules/auth/dtos';
import { PasswordService } from './password.service';

@Injectable()
export class ParticipantsAuthService {
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

    if (await this.passwordService.compare(password, participant.password))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      participantId: participant.id,
      groupId: 123,
      type: 'participant',
    });

    return {
      accessToken,
    };
  }

  async create() {
    const password = generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });

    // vorerst deaktiviert, muss besprochen werden
    // const hashedPassword = await this.passwordService.hash(password, 10);

    return await this.particpantsRepository.insert({
      // password: hashedPassword,
      password,
    });
  }
}
