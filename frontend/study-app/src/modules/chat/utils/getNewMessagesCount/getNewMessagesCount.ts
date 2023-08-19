import { useGetChatMessages } from "@modules/chat/hooks"

export const getNewMessagesCount = () => {
  const messages = useGetChatMessages().data;

  if (messages) {
    const incomingMessages = messages.filter((message) => message.directorName);
    if (incomingMessages === undefined) return 0; 
    return incomingMessages.filter((message) => !message.readAt).length;
  }
  return 0
}