import { useDateContext } from "@modules/date/contexts";
import React from "react";
import { Navigate } from "react-router-dom";

export interface DateGuardProps {
  children: JSX.Element;
}

export const DateGuard: React.FC<DateGuardProps> = ({
  children,
}) => {
  const { isFuture } = useDateContext();  

  return !isFuture ? children : <Navigate to="/" />;
};
