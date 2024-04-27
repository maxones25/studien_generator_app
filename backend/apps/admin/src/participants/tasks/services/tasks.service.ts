import { Inject, Injectable } from '@nestjs/common';
import { TasksRepository } from '../tasks.repository';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import datetime from '@shared/modules/datetime/datetime';

@Injectable()
export class TasksService implements IGetStudyRelatedDataUseCase {
  constructor(
    @Inject(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.tasksRepository.getRelatedByStudy(studyId, id);
  }

  async create(
    participantId: string,
    formId: string,
    { completedAt, rescheduled, scheduledAt }: CreateTaskDto,
  ) {
    scheduledAt = datetime.addOffset(scheduledAt);
    const task = await this.tasksRepository.create({
      participantId,
      formId,
      originalScheduledAt: scheduledAt,
      scheduledAt,
      completedAt,
      rescheduled,
    });
    return task.id;
  }

  async getAll(participantId: string) {
    return this.tasksRepository.getAll(participantId);
  }

  async update(
    id: string,
    { completedAt, rescheduled, scheduledAt }: UpdateTaskDto,
  ) {
    return this.tasksRepository.update(id, {
      completedAt,
      rescheduled,
      scheduledAt,
    });
  }

  async delete(
    id: string,
  ) {
    return this.tasksRepository.softDelete(id);
  }
}
