import { GetStudyRelatedScheduleUseCase } from '@admin/groups/application';
import {
  GET_STUDY_RELATED_SCHEDULE_USE_CASE,
  SCHEDULES_REPOSITORY,
  ISchedulesRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetStudyRelatedScheduleUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_SCHEDULE_USE_CASE,
  useFactory(schedulesRepository: ISchedulesRepository) {
    return new GetStudyRelatedScheduleUseCase(schedulesRepository);
  },
  inject: [SCHEDULES_REPOSITORY],
};
