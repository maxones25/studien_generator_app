import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../../entities/participant.entity';
import { Repository } from 'typeorm';
import { LoginParticipantDto } from './dtos/LoginParticipantDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';

@Injectable()
export class ParticipantsAuthService {
  constructor(
    @InjectRepository(Participant)
    private particpantsRepository: Repository<Participant>,
    private jwtService: JwtService,
  ) {}

  async checkCredentials({ id, password }: LoginParticipantDto) {
    const participant = await this.particpantsRepository.findOne({
      where: {
        id,
      },
    });

    if (!participant) throw new UnauthorizedException();

    if (await bcrypt.compare(password, participant.password))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      participantId: participant.id,
      groupId: 123,
      role: 'participant',
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
    // const hashedPassword = bcrypt.hashSync(password, 10);

    return await this.particpantsRepository.insert({
      // password: hashedPassword,
      password,
    });
  }
}
