import { Provider } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './services/tasks.service';
import { TasksCalculator } from './services/task-calculator.service';

const tasksProviders: Provider[] = [
  TasksService,
  TasksCalculator,
  TasksRepository,
];

export default tasksProviders;
