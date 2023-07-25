import { Module } from '@nestjs/common';
import { Director } from '@entities/director.entity';
import { StudyMember } from '@entities/study-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import authProviders from './auth.providers';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Director, StudyMember])],
  providers: authProviders,
  controllers: [AuthController],
})
export class AuthModule {}
