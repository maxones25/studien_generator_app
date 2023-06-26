import { useAccessTokenContext } from "@modules/auth/contexts";
import React from "react";
import { Navigate } from "react-router-dom";

export interface AuthenticationGuardProps {
  children: JSX.Element;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  children,
}) => {
  const accessToken = useAccessTokenContext();

  return accessToken.isValid ? children : <Navigate to="/login" />;
};
