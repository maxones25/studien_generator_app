import { Inject, Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TasksRepository)
    readonly tasksRepository: TasksRepository,
  ) {}

  async getByParticipant() {}
}
