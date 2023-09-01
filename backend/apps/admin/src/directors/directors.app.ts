import { Module } from '@nestjs/common';
import { DirectorsCommands } from './controllers/directors.commands';
import { DirectorsModule } from './directors.module';
import { AuthCommands } from './controllers/auth.commands';
import { DirectorsQueries } from './controllers/directors.queries';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands, AuthCommands, DirectorsQueries],
})
export class DirectorsApp {}
