import { Injectable } from '@nestjs/common';
import { Participant } from '../../entities/participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantDto } from './dtos/participantDto';
import { generate } from 'generate-password';
import { PasswordService } from '../auth/services/password.service';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
    private passwordService: PasswordService,
  ) {}

  //TODO 
  async create(studyId: string, groupId: string, { number }: ParticipantDto) {
    const password = generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });
    const participant = new Participant();
    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = await this.passwordService.hash(password, 10);
    await this.participantsRepository.insert(participant);
    return {...participant, password};
  }

  async getByStudy(studyId: string): Promise<Participant[]> {
    return this.participantsRepository.find({ where: { studyId } });
  }

  async getByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.find({ where: { groupId } });
  }

  async delete(participantId: string) {
    await this.participantsRepository.delete({ id: participantId });
  }
}
