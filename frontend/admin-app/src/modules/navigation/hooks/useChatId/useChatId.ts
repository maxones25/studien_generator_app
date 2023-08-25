import { usePathParam } from "..";

export const useChatId = (required = true) => {
  return usePathParam("chatId", required);
};
