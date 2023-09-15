import { IDirectorsRepository } from '@admin/directors/domain';

export class DirectorsService {
  constructor(private directorsRepository: IDirectorsRepository) {}

  async get() {
    return await this.directorsRepository.get();
  }

  async getById(id: string) {
    return await this.directorsRepository.getById(id);
  }

  async getNonStudyMembers(studyId: string) {
    return await this.directorsRepository.getNonStudyMembers(studyId);
  }

  async isDeleted(id: string) {
    return this.directorsRepository.isDeleted(id);
  }
}
