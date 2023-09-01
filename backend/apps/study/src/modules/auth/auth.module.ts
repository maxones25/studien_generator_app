import { Module } from '@nestjs/common';
import { Director } from '@entities';
import { StudyMember } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import authProviders from '@study/modules/auth/auth.providers';
import { Participant } from '@entities';
import { AuthGuard } from '@study/modules/auth//guards/auth.guard';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Participant])],
  providers: authProviders,
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
