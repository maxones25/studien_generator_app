import {
  GetGroupsByStudyUseCaseInput,
  IGetGroupsByStudyUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';

export class GetGroupsByStudyUseCase implements IGetGroupsByStudyUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({
    studyId,
    deleted,
  }: GetGroupsByStudyUseCaseInput): Promise<Group[]> {
    return this.groupsRepository.getGroupsByStudy(studyId, deleted);
  }
}
