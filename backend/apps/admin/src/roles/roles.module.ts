import { Module } from '@nestjs/common';
import rolesProviders from './roles.providers';
import { MembersModule } from '@admin/studies/members/members.module';

@Module({
  imports: [MembersModule],
  providers: rolesProviders,
})
export class RolesModule {}
