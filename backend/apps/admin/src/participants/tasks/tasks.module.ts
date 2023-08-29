import { Module } from '@nestjs/common';
import providers from './tasks.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@entities';
import { TasksCalculator } from './services/task-calculator.service';
import { TasksService } from './services/tasks.service';
import { TaskGuard } from './task.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers,
  exports: [TasksCalculator, TasksService, TaskGuard],
})
export class TasksModule {}
