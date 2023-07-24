import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../../../entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
