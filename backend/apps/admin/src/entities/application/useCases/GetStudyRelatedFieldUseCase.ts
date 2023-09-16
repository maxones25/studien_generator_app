import {
  IEntitiesRepository,
  IGetStudyRelatedFieldUseCase,
} from '@admin/entities/domain';

export class GetStudyRelatedFieldUseCase
  implements IGetStudyRelatedFieldUseCase
{
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.entitiesRepository.getFieldByStudy(studyId, id);
  }
}
