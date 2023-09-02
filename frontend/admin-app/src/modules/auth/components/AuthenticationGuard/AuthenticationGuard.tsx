import { Topic, useAccessTokenContext } from "@modules/auth/contexts";
import React from "react";
import { Navigate, To } from "react-router-dom";

export interface AuthenticationGuardProps {
  children: JSX.Element;
  path: To;
  topic: Topic;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  children,
  path,
  topic,
}) => {
  const accessToken = useAccessTokenContext();

  const isValid = accessToken.isValid && accessToken.topic === topic;

  return isValid ? children : <Navigate to={path} />;
};
