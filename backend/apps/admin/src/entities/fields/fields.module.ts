import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities';
import entityFieldsProviders from './fields.providers';
import { FieldsService } from './fields.service';
import { FieldGuard } from './guards/field.guard';
import { AddFieldUseCase } from './useCases/AddFieldUseCase';
import { UpdateFieldUseCase } from './useCases/UpdateFieldUseCase';
import { RemoveFieldUseCase } from './useCases/RemoveFieldUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField])],
  providers: entityFieldsProviders,
  exports: [
    FieldsService,
    FieldGuard,
    AddFieldUseCase,
    UpdateFieldUseCase,
    RemoveFieldUseCase,
  ],
})
export class FieldsModule {}
