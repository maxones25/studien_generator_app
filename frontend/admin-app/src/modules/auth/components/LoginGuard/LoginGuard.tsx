import { Topic, useAccessTokenContext } from "@modules/auth/contexts";
import React from "react";
import { Navigate, To } from "react-router-dom";

export interface LoginGuardProps {
  children: JSX.Element | JSX.Element[];
  path: To;

  topic: Topic;
}

export const LoginGuard: React.FC<LoginGuardProps> = ({
  children,
  path,
  topic,
}) => {
  const accessToken = useAccessTokenContext();

  const isValid = accessToken.isValid && accessToken.topic === topic;

  return isValid ? <Navigate to={path} /> : children;
};
