import { useGetUnreadCount } from "@modules/chat/hooks";
import { UseReadRequestResult } from "@modules/core/hooks";
import { createContext, FC, ReactNode, useContext } from "react";

interface ChatMessagesContextValue {
  unreadCount: UseReadRequestResult<number>;
}

interface ChatMessagesProviderProps {
  children: ReactNode;
}

const ChatMessagesContext = createContext<ChatMessagesContextValue | undefined>(
  undefined
);

export const ChatMessagesProvider: FC<ChatMessagesProviderProps> = ({
  children,
}) => {
  const unreadCount = useGetUnreadCount()

  return (
    <ChatMessagesContext.Provider value={{ unreadCount }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};

export const useChatMessagesContext = () => {
  const context = useContext(ChatMessagesContext);

  if (!context)
    throw new Error("ChatMessagesContext must be inside a ChatMessagesProvider");

  return context;
};
