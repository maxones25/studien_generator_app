import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '../../entities/entity-field.entity';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField])],
  providers: [FieldsService],
  controllers: [FieldsController],
})
export class FieldsModule {}
