import { Inject, Injectable } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { GET_STUDY_RELATED_SCHEDULE_USE_CASE } from '@admin/groups/domain';
import { GetStudyRelatedScheduleUseCase } from '@admin/groups/application';

@Injectable()
export class ScheduleGuard extends RecordGuard {
  constructor(
    @Inject(GET_STUDY_RELATED_SCHEDULE_USE_CASE)
    useCase: GetStudyRelatedScheduleUseCase,
  ) {
    super(useCase, 'schedule', 'scheduleId');
  }
}
