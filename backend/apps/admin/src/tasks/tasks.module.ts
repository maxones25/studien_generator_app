import { Module } from '@nestjs/common';
import providers from './tasks.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers,
})
export class TasksModule {}
