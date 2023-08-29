import { Provider } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';

const chatsProviders: Provider[] = [ChatsService, ChatsRepository];

export default chatsProviders;
