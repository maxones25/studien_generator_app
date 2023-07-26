import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { FormConfigurationsController } from './form-configurations.controller';
import { FormConfigurationsRepository } from './form-configurations.repository';
import formConfigurationsProviders from './form-configurations.providers';

@Module({
  imports: [TypeOrmModule.forFeature([FormConfiguration])],
  controllers: [FormConfigurationsController],
  providers: formConfigurationsProviders,
  exports: [FormConfigurationsRepository],
})
export class FormConfigurationsModule {}
