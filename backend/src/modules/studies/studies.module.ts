import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { Study } from '../../entities/study.entity';
import { StudyMembersModule } from './members/study-members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Study]),
    StudyMembersModule,
  ],
  providers: [StudiesService],
  controllers: [StudiesController],
})
export class StudiesModule {}
