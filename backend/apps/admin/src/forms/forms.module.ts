import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '@entities/form.entity';
import formsProviders from './forms.providers';
import { FormGuard } from './guards/form.guard';
import { FormsRepository } from './forms.repository';
import { QueryFormGuard } from './guards/query-form.guard';
import { FormsService } from './forms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  providers: formsProviders,
  exports: [FormGuard, QueryFormGuard, FormsService, FormsRepository],
})
export class FormsModule {}
