import { Provider } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { MessagesRepository } from './messages.repository';
import { ReadMessagesUseCase } from './transactions/ReadMessagesUseCase';
import { ReadReceiptsRepository } from './read-receipts.repository';
import { ChatGuard } from './guards/ChatGuard';

const chatsProviders: Provider[] = [
  ChatGuard,
  ChatsService,
  ChatsRepository,
  MessagesRepository,
  ReadReceiptsRepository,
  ReadMessagesUseCase,
  {
    provide: 'IReadReceiptsRepository',
    useClass: ReadReceiptsRepository,
  },
];

export default chatsProviders;
