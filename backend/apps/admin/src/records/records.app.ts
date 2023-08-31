import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsModule } from './records.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesModule } from '@admin/entities/entities/entities.module';
@Module({
  imports: [RecordsModule, StudiesModule, EntitiesModule],
  controllers: [RecordsController],
})
export class RecordsApp {}
