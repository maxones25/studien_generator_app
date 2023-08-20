import { Module } from '@nestjs/common';
import providers from './tasks.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@entities';
import { TasksCalculatorService } from './task-calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers,
  exports: [TasksCalculatorService]
})
export class TasksModule {}
