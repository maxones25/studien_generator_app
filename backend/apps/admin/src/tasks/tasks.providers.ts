import { Provider } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from '@entities';
import { EntityManager } from 'typeorm';
import { TasksService } from './tasks.service';
import { TasksCalculatorService } from './task-calculator.service';

const tasksProviders: Provider[] = [
  TasksService,
  TasksCalculatorService,
  {
    provide: TasksRepository,
    useFactory: (entityManager) => new TasksRepository(Task, entityManager),
    inject: [EntityManager],
  },
];

export default tasksProviders;
