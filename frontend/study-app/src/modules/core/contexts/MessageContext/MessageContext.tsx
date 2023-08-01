import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useSnackBarContext } from "..";
import { MessageType } from "@modules/core/types";

interface MessageContextValue {
  message?: string
}

interface MessageProviderProps {
  children: ReactNode;
}

const MessageContext = createContext<MessageContextValue | undefined>(
  undefined
);

const useMessageContextValue = () => {
  const { showError, showSuccess } = useSnackBarContext();
  const [message, setMessage] = useState<string|undefined>();

  navigator.serviceWorker.addEventListener("message", ({ data }) => {
    const {
      type,
      body,
    } = data
    switch (type) {
      case MessageType.Success:
        showSuccess(body);
        setMessage(body);
        break;
      case MessageType.Error:
        showError(body);
        setMessage(body);
        break;
      default:
        break;
    }
    
  });

  return {
    message
  }
};

export const MessageProvider: FC<MessageProviderProps> = ({
  children,
}) => {
  const value = useMessageContextValue();

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (!context)
    throw new Error("MessageContext must be inside a MessageProvider");

  return context;
};
