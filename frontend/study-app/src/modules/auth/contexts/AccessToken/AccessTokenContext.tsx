import { useStoredState } from "@modules/core/hooks";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AccessTokenData } from "@modules/auth/types";

interface AccessTokenContextValue {
  isValid: boolean;
  value?: string;
  participantId?: string;
  studyId?: string;
  groupId?: string;
  chatId?: string;
  set: (accessToken: string) => void;
  reset: () => void;
}

interface AccessTokenProviderProps {
  children: ReactNode;
}

const AccessTokenContext = createContext<AccessTokenContextValue | undefined>(
  undefined
);

const useAccessTokenContextValue = () => {
  const [value, set] = useStoredState<string | undefined>("accessToken");
  const [data, setData] = useState<AccessTokenData | undefined>(undefined)

  const reset = () => {
    set(undefined);
  };

  useEffect(() => {
    if (value) setData(jwt_decode(value));
    if (!value) setData(undefined)
  }, [value])

  const currentDateTime = () => Math.floor(new Date().getTime() / 1000)
  const isValid = !data ? false : data.exp < currentDateTime() ? false : true;
  const participantId = data?.participantId;
  const studyId = data?.participantId;
  const groupId = data?.groupId;
  const chatId = data?.chatId;

  return { value, isValid, participantId, studyId, groupId, chatId, set, reset };
};

export const AccessTokenProvider: FC<AccessTokenProviderProps> = ({
  children,
}) => {
  const value = useAccessTokenContextValue();

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessTokenContext = () => {
  const context = useContext(AccessTokenContext);

  if (!context)
    throw new Error("AccessTokenContext must be inside a AccessTokenProvider");

  return context;
};
