import { Injectable, Inject } from '@nestjs/common';
import { Participant } from '@entities/participant.entity';
import { ParticipantsRepository } from './participants.repository';
import { Task } from '@entities';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { StartParticipantStudyTransaction } from './transactions/StartParticipantStudyTransaction';
import { CreateParticipantDto } from './dtos/CreateParticipantDto';
import { StartStudyDto } from './dtos/StartStudyDto';
import { CreateParticipantTransaction } from './transactions/CreateParticipantTransaction';

@Injectable()
export class ParticipantsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(ParticipantsRepository)
    private participantsRepository: ParticipantsRepository,
    @Inject(StartParticipantStudyTransaction)
    private startParticipantStudyTransaction: StartParticipantStudyTransaction,
    @Inject(CreateParticipantTransaction)
    private createParticipantTransaction: CreateParticipantTransaction,
  ) {}

  async getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.participantsRepository.getRelatedByStudy(studyId, id);
  }

  async create(
    studyId: string,
    password: string,
    { number, groupId }: CreateParticipantDto,
  ) {
    const id = await this.createParticipantTransaction.run({
      groupId,
      studyId,
      number,
      password
    })

    return id;
  }

  async getById(id: string) {
    return this.participantsRepository.getById(id);
  }

  async startStudy(participantId: string, tasks: Task[], data: StartStudyDto) {
    await this.startParticipantStudyTransaction.run({
      participantId,
      tasks,
      data,
    });
  }

  async changeNumber(id: string, number: string) {
    return await this.participantsRepository.update(id, {
      number,
    });
  }

  async changeGroup(id: string, groupId: string) {
    return await this.participantsRepository.update(id, {
      groupId,
    });
  }

  async regeneratePassword(participantId: string, password: string) {
    await this.participantsRepository.update(
      { id: participantId },
      { password },
    );
    return { password };
  }

  async getByStudy(studyId: string) {
    return this.participantsRepository.getByStudy(studyId);
  }

  async getByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.getByGroup(groupId);
  }

  async delete(id: string) {
    return await this.participantsRepository.delete({ id });
  }
}
