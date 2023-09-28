import {
  IGetStudyRelatedScheduleUseCase,
  ISchedulesRepository,
} from '@admin/groups/domain';

export class GetStudyRelatedScheduleUseCase
  implements IGetStudyRelatedScheduleUseCase
{
  constructor(private readonly schedulesRepository: ISchedulesRepository) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.schedulesRepository.getStudyRelatedSchedule(studyId, id);
  }
}
