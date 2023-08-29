import { Module } from '@nestjs/common';
import providers from './tasks.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@entities';
import { TasksCalculator } from './services/task-calculator.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers,
  exports: [TasksCalculator, TasksService],
})
export class TasksModule {}
