import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities/form.entity';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormConfiguration } from '@entities/form-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormConfiguration])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
