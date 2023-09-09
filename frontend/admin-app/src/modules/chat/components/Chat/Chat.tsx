import React from "react";
import { List, Container } from "@mui/material";
import { useGetChatMessages, useReadChatMessages } from "@modules/chat/hooks";
import { ChatMessage } from "..";

export const Chat: React.FC = () => {
  const messages = useGetChatMessages();

  useReadChatMessages();

  return (
    <Container sx={{ overflow: "auto" }} maxWidth={false}>
      <List>
        {messages.data?.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </List>
    </Container>
  );
};
