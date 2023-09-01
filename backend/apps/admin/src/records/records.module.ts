import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '@entities';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordsService, RecordsRepository],
  exports: [RecordsService],
})
export class RecordsModule {}
