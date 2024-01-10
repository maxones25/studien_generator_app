import { useAccessTokenContext } from "@modules/auth/contexts";
import React from "react";
import { Navigate } from "react-router-dom";
import { InitiateAccountDialog } from "..";

export interface AuthenticationGuardProps {
  children: JSX.Element;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  children,
}) => {
  const accessToken = useAccessTokenContext();  

  return accessToken.isValid ? 
    <>
      {children}
      <InitiateAccountDialog open={Boolean(accessToken.isInitial)}/>
    </> 
    : <Navigate to="/login" />;
};
