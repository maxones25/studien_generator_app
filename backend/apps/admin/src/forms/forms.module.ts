import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities/form.entity';
import { FormsController } from './forms.controller';
import formsProviders from './forms.providers';
import { FormGuard } from './guards/form.guard';
import { FormsRepository } from './forms.repository';
import { QueryFormGuard } from './guards/query-form.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  controllers: [FormsController],
  providers: formsProviders,
  exports: [FormGuard, QueryFormGuard, FormsRepository],
})
export class FormsModule {}
