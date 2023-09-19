import {
  IGroupsRepository,
  IIsGroupDeletedUseCase,
  IsGroupDeletedUseCaseInput,
} from '@admin/groups/domain';

export class IsGroupDeletedUseCase implements IIsGroupDeletedUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}
  execute({ groupId }: IsGroupDeletedUseCaseInput): Promise<boolean> {
    return this.groupsRepository.isGroupDeleted(groupId);
  }
}
