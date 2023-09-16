import { IDirectorsRepository } from '@admin/directors/domain';

export class DirectorsService {
  constructor(private directorsRepository: IDirectorsRepository) {}

  async getNonStudyMembers(studyId: string) {
    return await this.directorsRepository.getDirectorsNotMemberOfStudyById(
      studyId,
    );
  }

  async isDeleted(id: string) {
    return this.directorsRepository.isDeleted(id);
  }
}
