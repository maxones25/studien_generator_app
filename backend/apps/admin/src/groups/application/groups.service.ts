import { Inject, Injectable } from '@nestjs/common';
import { GroupsRepository } from '../repositories/groups.repository';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { CreateGroupDto } from '../infrastructure/http';

@Injectable()
export class GroupsService implements IGetStudyRelatedDataUseCase {
  constructor(
    @Inject(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.groupsRepository.getRelatedByStudy(studyId, id);
  }

  async create(studyId: string, { name }: CreateGroupDto) {
    const group = await this.groupsRepository.create({ studyId, name });
    return group.id;
  }

  async getByStudy(studyId: string, deleted = false) {
    return this.groupsRepository.getByStudy(studyId, deleted);
  }

  async getById(groupId: string) {
    return this.groupsRepository.getById(groupId);
  }

  async changeName(groupId: string, name: string) {
    return await this.groupsRepository.update(groupId, { name });
  }

  async hardDelete(id: string) {
    return await this.groupsRepository.hardDelete(id);
  }

  async softDelete(id: string) {
    return await this.groupsRepository.softDelete(id);
  }

  async restore(id: string) {
    return await this.groupsRepository.restore(id);
  }

  async isDeleted(id: string) {
    return await this.groupsRepository.isDeleted(id);
  }
}
