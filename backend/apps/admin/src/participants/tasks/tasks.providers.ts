import { Provider } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './services/tasks.service';
import { TasksCalculator } from './services/task-calculator.service';
import { TaskGuard } from './task.guard';

const tasksProviders: Provider[] = [
  TaskGuard,
  TasksService,
  TasksCalculator,
  TasksRepository,
];

export default tasksProviders;
