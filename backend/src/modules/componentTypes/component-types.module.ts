import { Module } from '@nestjs/common';
import { ComponentTypesController } from './component-type.controller';
import { ComponentTypesService } from './component-types.service';

@Module({
  controllers: [ComponentTypesController],
  providers: [ComponentTypesService],
})
export class ComponentTypesModule {}
