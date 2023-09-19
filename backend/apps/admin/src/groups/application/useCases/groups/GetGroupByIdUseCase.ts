import {
  GetGroupByIdUseCaseInput,
  IGetGroupByIdUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';

export class GetGroupByIdUseCase implements IGetGroupByIdUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({ groupId }: GetGroupByIdUseCaseInput): Promise<Group> {
    return this.groupsRepository.getGroupById(groupId);
  }
}
