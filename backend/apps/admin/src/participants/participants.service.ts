import { Injectable, Inject } from '@nestjs/common';
import { Participant } from '@entities/participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantDto } from './dtos/participantDto';
import { PasswordService } from '@shared/modules/password/password.service';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
    @Inject(StartParticipantStudyTransaction)
    private startParticipantStudyTransaction: StartParticipantStudyTransaction,
    private passwordService: PasswordService,
  ) {}

  async create(studyId: string, { number, groupId }: ParticipantDto) {
    const participant = new Participant();
    const password = await this.passwordService.generate();
    participant.studyId = studyId;
    participant.groupId = groupId;
    participant.number = number;
    participant.password = await this.passwordService.hash(password, 10);
    await this.participantsRepository.insert(participant);
    return { ...participant, password: password };
  }

  async regeneratePassword(participantId: string) {
    const password = await this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password, 10);
    await this.participantsRepository.update(
      { id: participantId },
      { password: hashedPassword },
    );
    return { password: password };
  }

  async start(participantId: string) {
    this.startParticipantStudyTransaction.run({ participantId });
  }

  async update(participantId: string, { number }: ParticipantDto) {
    await this.participantsRepository.update({ id: participantId }, { number });
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
