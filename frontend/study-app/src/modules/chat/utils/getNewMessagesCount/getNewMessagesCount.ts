import { useGetChatMessages } from "@modules/chat/hooks"

export const getNewMessagesCount = () => {
  const messages = useGetChatMessages().data;
  if (!messages) return 0

  const incomingMessages = messages.filter((message) => message.directorName);
  if (incomingMessages === undefined) return 0; 

  return incomingMessages.filter((message) => !message.readAt).length;
}