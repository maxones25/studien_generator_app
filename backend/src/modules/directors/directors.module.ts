import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '../../entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: [DirectorsService],
  controllers: [DirectorsController]
})
export class DirectorsModule {}
