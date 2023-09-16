import { Module } from '@nestjs/common';
import rolesProviders from './roles.providers';
import { MembersModule } from '@admin/members/members.module';
import { RolesGuard } from '../members/infrastructure/http';

@Module({
  imports: [MembersModule],
  providers: rolesProviders,
  exports: [RolesGuard],
})
export class RolesModule {}
