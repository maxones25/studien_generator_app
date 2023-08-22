import { Module } from '@nestjs/common';
import { DirectorsCommands } from './controllers/directors.commands';
import { DirectorsModule } from './directors.module';
import { AuthCommands } from './controllers/auth.commands';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands, AuthCommands],
})
export class DirectorsApp {}
