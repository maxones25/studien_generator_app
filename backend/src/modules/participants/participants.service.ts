import { Injectable } from '@nestjs/common';
import { Participant } from '../../entities/participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantDto } from './dtos/participantDto';
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
    const participant = new Participant();
    const password = await this.passwordService.generate();
    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = await this.passwordService.hash(password, 10);
    await this.participantsRepository.insert(participant);
    return {...participant, password: password};
  }
  
  async regeneratePassword(participantId: string) {
    const password = await this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password, 10);
    await this.participantsRepository.update(
      { id: participantId }, 
      { password: hashedPassword },
    );
    return {password: password};
  }

  async update(participantId: string, updatedParticipant: ParticipantDto) {
    await this.participantsRepository.update({ id: participantId }, updatedParticipant)
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
