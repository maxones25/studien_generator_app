import { Module } from '@nestjs/common';
import { RecordsQueries } from './records.queries';
import { RecordsModule } from './records.module';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesModule } from '@admin/entities/entities/entities.module';
@Module({
  imports: [RecordsModule, StudiesModule, EntitiesModule],
  controllers: [RecordsQueries],
})
export class RecordsApp {}
