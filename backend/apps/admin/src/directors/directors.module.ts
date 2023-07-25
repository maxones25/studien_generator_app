import { Module } from '@nestjs/common';
import { DirectorsController } from './directors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities/director.entity';
import directorsProviders from './directors.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: directorsProviders,
  controllers: [DirectorsController]
})
export class DirectorsModule {}
