import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from '@entities';
import directorsProviders from './directors.providers';
import { DirectorsService } from './directors.service';
import { DirectorGuard } from './guards/director.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: directorsProviders,
  exports: [DirectorsService, DirectorGuard, AuthGuard],
})
export class DirectorsModule {}
