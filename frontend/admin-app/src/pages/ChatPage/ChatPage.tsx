import { Chat, ChatInput } from "@modules/chat/components";
import { Page } from "@modules/core/components";

import React from "react";

export interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {

  return (
    <Page sx={{padding: 0, justifyContent: "space-between"}} testId="chat page" flex={1}>
      <Chat />
      <ChatInput />
    </Page>
  );
};

export default ChatPage;
