import React, { useEffect, useRef } from 'react';
import { List, Container } from '@mui/material';
import { useGetChatMessages, useReadMessages } from '@modules/chat/hooks';
import { ChatMessage } from '..';
import { getNewMessagesCount } from '@modules/chat/utils';

const Chat: React.FC = () => {
  const messages = useGetChatMessages();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const readMessages = useReadMessages();
  const newMessagesCount = getNewMessagesCount();



  useEffect(() => {
    if (newMessagesCount > 0)
      readMessages.mutate({
        readAt: new Date()
      });
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ });
  }, []);

  return (
    <Container sx={{overflow: 'auto'}} maxWidth="sm">
      <List>
        {messages.data?.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={chatEndRef}></div>
      </List>
    </Container>
  );
};

export default Chat;