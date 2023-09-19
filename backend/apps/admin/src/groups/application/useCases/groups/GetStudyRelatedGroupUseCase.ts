import {
  IGetStudyRelatedGroupUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';

export class GetStudyRelatedGroupUseCase
  implements IGetStudyRelatedGroupUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute(studyId: string, id: string): Promise<Group> {
    return this.groupsRepository.getGroupByStudy(studyId, id);
  }
}
