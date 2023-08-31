import { Module } from '@nestjs/common';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { ChatsCommands } from './controllers/chats.commands';
import { ChatsQueries } from './controllers/chats.queries';
import { ChatsModule } from './chats.module';

@Module({
  imports: [
    ChatsModule,
    StudiesModule,
  ],
  controllers: [ChatsCommands, ChatsQueries],
})
export class ChatsApp {}
