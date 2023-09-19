import {
  FormConfigNotFoundError,
  GroupNotFoundError,
  IGroupsRepository,
  IRemoveFormConfigUseCase,
  RemoveFormConfigUseCaseInput,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';

export class RemoveFormConfigUseCase implements IRemoveFormConfigUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    formConfigId,
  }: RemoveFormConfigUseCaseInput): Promise<Group> {
    const formConfig = await this.groupsRepository.getFormConfigById(
      formConfigId,
    );

    if (formConfig === null) throw new FormConfigNotFoundError();

    const group = await this.groupsRepository.getGroupById(formConfig.groupId);

    if (group === null) throw new GroupNotFoundError();

    await this.groupsRepository.deleteFormConfig(formConfigId);

    return group;
  }
}
