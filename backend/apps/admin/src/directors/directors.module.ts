import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities/director.entity';
import directorsProviders from './directors.providers';
import { DirectorsService } from './directors.service';
import { DirectorsRepository } from './directors.repository';
import { DirectorGuard } from './director.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: directorsProviders,
  exports: [DirectorsService, DirectorsRepository, DirectorGuard],
})
export class DirectorsModule {}
