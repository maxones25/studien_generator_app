import { Module } from '@nestjs/common';
import { DirectorsCommands } from './infrastructure/http/api/directors.commands';
import { DirectorsModule } from './directors.module';
import { AuthCommands } from './infrastructure/http/api/auth.commands';
import { DirectorsQueries } from './infrastructure/http/api/directors.queries';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands, AuthCommands, DirectorsQueries],
})
export class DirectorsApp {}
