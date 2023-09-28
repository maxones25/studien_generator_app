import {
  IRemoveScheduleUseCase,
  ISchedulesRepository,
  RemoveScheduleUseCaseInput,
} from '@admin/groups/domain';

export class RemoveScheduleUseCase implements IRemoveScheduleUseCase {
  constructor(private readonly schedulesRepository: ISchedulesRepository) {}

  execute({ scheduleId }: RemoveScheduleUseCaseInput): Promise<number> {
    return this.schedulesRepository.removeSchedule(scheduleId);
  }
}
