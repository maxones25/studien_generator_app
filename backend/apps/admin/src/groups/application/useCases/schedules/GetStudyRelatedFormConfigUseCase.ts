import {
  IGetStudyRelatedFormConfigUseCase,
  IGroupsRepository,
  ISchedulesRepository,
} from '@admin/groups/domain';

export class GetStudyRelatedFormConfigUseCase
  implements IGetStudyRelatedFormConfigUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.groupsRepository.getStudyRelatedFormConfig(studyId, id);
  }
}
