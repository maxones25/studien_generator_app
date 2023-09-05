import { StudyMember, Director, Study } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesRepository } from './infrastructure/StudiesRepository';
import { MembersRepository } from './infrastructure/MembersRepository';
import { GetStudiesUseCase } from './app/GetStudiesUseCase';
import { CreateStudyUseCase } from './infrastructure/useCases/CreateStudyUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Director, StudyMember, Study])],
  providers: [
    StudiesRepository,
    MembersRepository,
    CreateStudyUseCase,
    GetStudiesUseCase,
  ],
  exports: [GetStudiesUseCase, CreateStudyUseCase],
})
export class TestModule {}
