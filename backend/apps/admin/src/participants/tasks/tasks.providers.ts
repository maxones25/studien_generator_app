import { Provider } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './services/tasks.service';
import { TasksCalculatorService } from './services/task-calculator.service';

const tasksProviders: Provider[] = [
  TasksService,
  TasksCalculatorService,
  TasksRepository,
];

export default tasksProviders;
