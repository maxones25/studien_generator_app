import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormConfiguration } from 'src/entities/form-configuration.entity';
import { FormConfigurationsController } from './form-configurations.controller';
import { FormConfigurationsService } from './form-configurations.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormConfiguration])],
  controllers: [FormConfigurationsController],
  providers: [FormConfigurationsService],
})
export class FormConfigurationsModule {}
