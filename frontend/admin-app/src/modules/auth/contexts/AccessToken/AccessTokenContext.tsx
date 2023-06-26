import { useStoredState } from "@modules/core/hooks";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import jwt_decode from "jwt-decode";

interface AccessTokenContextValue {
  isValid: boolean;
  value: string | undefined;
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

  const reset = () => {
    set(undefined);
  };

  const isValid = useMemo(() => {
    if (typeof value !== "string") return false;
    const { exp } = jwt_decode(value) as { exp: number };
    const currentDateTime = Math.floor(new Date().getTime() / 1000);
    if (exp < currentDateTime) return false;
    return true;
  }, [value]);

  return { value, isValid, set, reset };
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
