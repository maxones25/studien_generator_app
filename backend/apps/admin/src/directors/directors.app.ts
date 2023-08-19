import { Module } from '@nestjs/common';
import { DirectorsCommands } from './controllers/directors.commands';
import { DirectorsModule } from './directors.module';

@Module({
  imports: [DirectorsModule],
  controllers: [DirectorsCommands],
})
export class DirectorsApp {}
