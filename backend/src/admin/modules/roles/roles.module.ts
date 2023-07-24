import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyMember } from '@entities/study-member.entity';
import rolesProviders from './roles.providers';

@Module({
  imports: [TypeOrmModule.forFeature([StudyMember])],
  providers: rolesProviders,
})
export class RolesModule {}
