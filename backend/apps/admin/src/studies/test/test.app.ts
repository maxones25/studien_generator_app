import { Module } from '@nestjs/common';
import { TestModule } from './test.module';
import { StudiesExceptionHandler } from './infrastructure/ExceptionHandler';
import { TestCommands } from './infrastructure/controllers/TestCommands';
import { TestQueries } from './infrastructure/controllers/TestQueries';

@Module({
  imports: [TestModule],
  providers: [StudiesExceptionHandler],
  controllers: [TestCommands, TestQueries],
})
export class TestApp {}
