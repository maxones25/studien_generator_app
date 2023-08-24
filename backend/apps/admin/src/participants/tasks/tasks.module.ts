import { Module } from '@nestjs/common';
import providers from './tasks.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@entities';
import { TasksCalculatorService } from './services/task-calculator.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers,
  exports: [TasksCalculatorService, TasksService],
})
export class TasksModule {}
