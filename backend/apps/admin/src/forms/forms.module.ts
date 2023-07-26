import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities/form.entity';
import { FormsController } from './forms.controller';
import formsProviders from './forms.providers';
import { FormGuard } from './form.guard';
import { FormsRepository } from './forms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  controllers: [FormsController],
  providers: formsProviders,
  exports: [FormGuard, FormsRepository],
})
export class FormsModule {}
