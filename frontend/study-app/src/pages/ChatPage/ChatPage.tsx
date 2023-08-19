import { ChatInput } from '@modules/chat/components';
import Chat from '@modules/chat/components/Chat/Chat';
import { Page } from '@modules/core/components';
import React from 'react';

export interface ChatPageProps {}

const ChatPage : React.FC<ChatPageProps> = () => {

  return (
    <Page testId="chat page" footer={<ChatInput />}>
      <Chat />
    </Page>
  );
};

export default ChatPage