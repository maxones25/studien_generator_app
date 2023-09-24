import {
  GetFormConfigsUseCaseInput,
  IGetFormConfigsUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { FormConfig } from '@entities/core/group';

export class GetFormConfigsUseCase implements IGetFormConfigsUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({
    groupId,
    isActive,
    type,
  }: GetFormConfigsUseCaseInput): Promise<FormConfig[]> {
    return this.groupsRepository.getFormConfigs(groupId, isActive, type);
  }
}
