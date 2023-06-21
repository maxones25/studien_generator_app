import { useAccessTokenContext } from "@modules/auth/contexts";
import React from "react";
import { Navigate } from "react-router-dom";

export interface LoginGuardProps {
  children: JSX.Element;
}

export const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const accessToken = useAccessTokenContext();

  return accessToken.isValid ? <Navigate to="/" /> : children;
};
