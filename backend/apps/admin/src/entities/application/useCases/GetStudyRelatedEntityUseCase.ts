import {
  IEntitiesRepository,
  IGetStudyRelatedEntityUseCase,
} from '@admin/entities/domain';

export class GetStudyRelatedEntityUseCase
  implements IGetStudyRelatedEntityUseCase
{
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}
  async execute(studyId: string, id: string): Promise<any> {
    return await this.entitiesRepository.getRelatedByStudy(studyId, id);
  }
}
