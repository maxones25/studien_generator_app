import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from '@entities/entity-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityField])],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
