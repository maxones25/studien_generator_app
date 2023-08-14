import { Group } from '@entities/group.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { UpdateGroupDto } from './dtos/UpdateGroupDto';
import { GroupsRepository } from './groups.repository';
import { FormConfigurationsRepository } from '@admin/forms/configurations/form-configurations.repository';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { CreateGroupFormConfigDto } from './dtos/CreateGroupFormConfigDto';
import { UpdateGroupFormConfigDto } from './dtos/UpdateGroupFormConfigDto';

@Injectable()
export class GroupsService {
  constructor(
    @Inject(GroupsRepository)
    private groupsRepository: GroupsRepository,
    @Inject(FormConfigurationsRepository)
    private formConfigurationsRepository: FormConfigurationsRepository,
  ) {}

  async create(studyId: string, { name }: CreateGroupDto) {
    const group = new Group();

    group.name = name;
    group.studyId = studyId;

    await this.groupsRepository.insert(group);

    return group.id;
  }

  async updateForm(
    configId: string,
    { type, isActive }: UpdateGroupFormConfigDto,
  ) {
    const { affected } = await this.formConfigurationsRepository.update(
      configId,
      {
        type,
        isActive,
      },
    );

    return affected;
  }

  async getByStudy(studyId: string) {
    return this.groupsRepository.getByStudy(studyId);
  }

  async getById(groupId: string) {
    return this.groupsRepository.getById(groupId);
  }

  async update(groupId: string, { name }: UpdateGroupDto) {
    const { affected } = await this.groupsRepository.update(groupId, { name });
    return affected;
  }

  async delete(id: string) {
    const { affected } = await this.groupsRepository.delete(id);
    return affected;
  }

  async createForm(
    studyId: string,
    groupId: string,
    { isActive, type }: CreateGroupFormConfigDto,
  ) {
    const formConfig = new FormConfiguration();

    formConfig.studyId = studyId;
    formConfig.groupId = groupId;
    formConfig.isActive = isActive;
    formConfig.type = type;

    await this.formConfigurationsRepository.insert(formConfig);

    return formConfig.id;
  }

  async getForms(id: string) {
    return this.formConfigurationsRepository.getByGroup(id);
  }
}
