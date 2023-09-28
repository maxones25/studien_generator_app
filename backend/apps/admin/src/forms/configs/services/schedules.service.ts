import { Inject, Injectable } from '@nestjs/common';
import { SchedulesRepository } from '../repositories/schedules.repository';
import { DeleteScheduleTransaction } from '../transactions/DeleteScheduleTransaction';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class SchedulesService implements IGetStudyRelatedDataUseCase {
  constructor(
    @Inject(SchedulesRepository)
    readonly schedulesRepository: SchedulesRepository,
    @Inject(DeleteScheduleTransaction)
    readonly deleteScheduleTransaction: DeleteScheduleTransaction,
  ) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.schedulesRepository.getStudyRelated(studyId, id);
  }

  async getActiveByGroup(groupId: string) {
    return this.schedulesRepository.getActiveByGroup(groupId);
  }

  async delete(scheduleId: string) {
    return await this.deleteScheduleTransaction.run({ scheduleId });
  }
}
