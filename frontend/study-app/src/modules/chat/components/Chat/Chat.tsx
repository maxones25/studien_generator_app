import React, { useEffect, useRef } from 'react';
import { List, Container } from '@mui/material';
import { useGetChatMessages } from '@modules/chat/hooks';
import { ChatMessage } from '..';

const Chat: React.FC = () => {
  const messages = useGetChatMessages();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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