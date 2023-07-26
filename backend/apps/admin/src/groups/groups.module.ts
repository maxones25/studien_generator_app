import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@entities/group.entity';
import { StudyMember } from '@entities/study-member.entity';
import { GroupsController } from './groups.controller';
import groupsProviders from './groups.providers';
import { FormConfigurationsModule } from '@admin/forms/configurations/form-configurations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, StudyMember]),
    FormConfigurationsModule,
  ],
  providers: groupsProviders,
  controllers: [GroupsController],
})
export class GroupsModule {}
