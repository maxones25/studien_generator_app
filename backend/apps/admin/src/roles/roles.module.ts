import { Module } from '@nestjs/common';
import rolesProviders from './roles.providers';
import { MembersModule } from '@admin/studies/members/members.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [MembersModule],
  providers: rolesProviders,
  exports: [RolesGuard],
})
export class RolesModule {}
