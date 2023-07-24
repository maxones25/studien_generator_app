import { Module } from '@nestjs/common';
import { Director } from '@entities/director.entity';
import { StudyMember } from '@entities/study-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import authProviders from '@study/modules/auth/auth.providers';
import { Participant } from '@entities/participant.entity';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Participant])],
  providers: authProviders,
  controllers: [AuthController],
})
export class AuthModule {}
