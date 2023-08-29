import { RecordGuard } from '@shared/modules/records/record.guard';
import { Inject, Injectable } from '@nestjs/common';
import { TasksService } from './services/tasks.service';

@Injectable()
export class TaskGuard extends RecordGuard {
  constructor(
    @Inject(TasksService)
    service: TasksService,
  ) {
    super(service, 'task', 'taskId');
  }
}
