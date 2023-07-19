import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '../../../entities/entity-field.entity';
import { EntityFieldsService } from './entity-fields.service';
import { EntityFieldsController } from './entity-fields.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField])],
  providers: [EntityFieldsService],
  controllers: [EntityFieldsController],
})
export class EntityFieldsModule {}
