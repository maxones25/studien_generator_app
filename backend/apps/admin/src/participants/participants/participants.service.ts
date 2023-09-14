import { Injectable, Inject } from '@nestjs/common';
import { Participant } from '@entities';
import { ParticipantsRepository } from './participants.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { AttributesRepository } from './attributes.repository';
import { EntityManager } from 'typeorm';
import { ParticipantAttribute } from '@entities';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password/IPasswordService';

@Injectable()
export class ParticipantsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(ParticipantsRepository)
    private participantsRepository: ParticipantsRepository,
    @Inject(AttributesRepository)
    private attributesRepository: AttributesRepository,
    @Inject(PASSWORD_SERVICE)
    private passwordService: IPasswordService,
  ) {}

  static build(
    entityManager: EntityManager,
    passwordService: IPasswordService,
  ) {
    return new ParticipantsService(
      new ParticipantsRepository(entityManager.getRepository(Participant)),
      new AttributesRepository(
        entityManager.getRepository(ParticipantAttribute),
      ),
      passwordService,
    );
  }

  hardDeleteByGroup(groupId: string) {
    return this.participantsRepository.hardDeleteByGroup(groupId);
  }

  softDeleteByGroup(groupId: string) {
    return this.participantsRepository.softDeleteByGroup(groupId);
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

  async removeGroup(id: string) {
    return await this.participantsRepository.removeGroup(id);
  }

  async updatePassword(participantId: string) {
    
    const password = await this.passwordService.generate();
    const hashedPassword = await this.passwordService.hash(password);

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

  async getByStudy(studyId: string, deleted = false) {
    return this.participantsRepository.getByStudy(studyId, deleted);
  }

  async getByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.getByGroup(groupId);
  }

  async hardDelete(id: string) {
    return await this.participantsRepository.hardDelete(id);
  }

  async softDelete(id: string) {
    return await this.participantsRepository.softDelete(id);
  }

  async restore(id: string) {
    return await this.participantsRepository.restore(id);
  }

  async isDeleted(id: string) {
    return this.participantsRepository.isDeleted(id);
  }

  removeGroupByGroup(groupId: string) {
    return this.participantsRepository.removeGroupByGroup(groupId);
  }
}
