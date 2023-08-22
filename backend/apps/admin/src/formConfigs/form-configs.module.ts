import { Module } from '@nestjs/common';
import providers from './form-configs.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormConfiguration } from '@entities';
import { FormConfigsController } from './form-configs.controller';
import { GroupsModule } from '@admin/groups/groups.module';
import { FormsModule } from '@admin/forms/forms/forms.module';
import { FormConfigGuard } from './form-config.guard';
import { FormConfigsRepository } from './form-configs.repository';
import { FormConfigsService } from './form-configs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormConfiguration]),
    GroupsModule,
    FormsModule,
  ],
  controllers: [FormConfigsController],
  providers,
  exports: [FormConfigGuard, FormConfigsRepository, FormConfigsService],
})
export class FormConfigsModule {}
