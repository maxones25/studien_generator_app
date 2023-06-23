import { Injectable } from '@nestjs/common';
import { Participant } from '../../../entities/participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantDto } from './dtos/participantDto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  async create(groupId: string, { number }: ParticipantDto) {
    await this.participantsRepository.insert({ groupId, number });
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
