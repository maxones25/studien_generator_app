import { Injectable, Inject } from '@nestjs/common';
import { Participant } from '@entities';
import { ParticipantsRepository } from './participants.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { AttributesRepository } from './attributes.repository';
import { EntityManager, Repository } from 'typeorm';
import { ParticipantAttribute } from '@entities';
import { PasswordService } from '@shared/modules/password/password.service';

@Injectable()
export class ParticipantsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(ParticipantsRepository)
    private participantsRepository: ParticipantsRepository,
    @Inject(AttributesRepository)
    private attributesRepository: AttributesRepository,
    @Inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  static build(entityManager: EntityManager, passwordService: PasswordService) {
    return new ParticipantsService(
      new ParticipantsRepository(entityManager.getRepository(Participant)),
      new AttributesRepository(
        entityManager.getRepository(ParticipantAttribute),
      ),
      passwordService,
    );
  }

  async getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.participantsRepository.getRelatedByStudy(studyId, id);
  }

  async getById(id: string) {
    return this.participantsRepository.getById(id);
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

  async updatePassword(participantId: string) {
    const password = await this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password, 10);
    await this.participantsRepository.update(participantId, {
      password: hashedPassword,
    });
    return password;
  }

  async setStartDate(participantId: string, startDate: Date) {
    await this.attributesRepository.set(
      participantId,
      'startedAt',
      startDate.toISOString(),
    );
  }

  async getByStudy(studyId: string) {
    return this.participantsRepository.getByStudy(studyId);
  }

  async getByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.getByGroup(groupId);
  }

  async delete(id: string) {
    return await this.participantsRepository.hardDelete({ id });
  }
}
