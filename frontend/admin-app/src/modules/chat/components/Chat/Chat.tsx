import React, { useEffect, useRef } from 'react';
import { List, Container } from '@mui/material';
import { useGetChatMessages, useReadChatMessages } from '@modules/chat/hooks';
import { ChatMessage } from '..';

export const Chat: React.FC = () => {
  const messages = useGetChatMessages();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const readMessages = useReadChatMessages();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    readMessages.mutate({
      readAt: new Date()
    });
    chatEndRef.current?.scrollIntoView({ });
  }, []);

  return (
    <Container sx={{overflow: 'auto'}} maxWidth={false}>
      <List>
        {messages.data?.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={chatEndRef}></div>
      </List>
    </Container>
  );
};