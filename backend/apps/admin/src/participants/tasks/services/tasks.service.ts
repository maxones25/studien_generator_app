import { Inject, Injectable } from '@nestjs/common';
import { TasksRepository } from '../tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getAll(participantId: string) {
    return this.tasksRepository.getAll(participantId);
  }
}
