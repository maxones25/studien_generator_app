import { Module } from '@nestjs/common';
import { DirectorsCommands } from './infrastructure/http/controllers/directors.commands';
import { DirectorsModule } from './directors.module';
import { AuthCommands } from './infrastructure/http/controllers/auth.commands';
import { DirectorsQueries } from './infrastructure/http/controllers/directors.queries';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands, AuthCommands, DirectorsQueries],
})
export class DirectorsApp {}
