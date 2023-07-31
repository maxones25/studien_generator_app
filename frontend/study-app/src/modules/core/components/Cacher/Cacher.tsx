import { useAccessTokenContext } from '@modules/auth/contexts';
import { RequestHeader, apiRequest } from '@modules/core/utils';
import React, { ReactNode } from 'react';

export interface CacherProps {
  children: ReactNode;
}

export const Cacher : React.FC<CacherProps>= ({
  children,
}) => {
  const accessToken = useAccessTokenContext()
  const headers: RequestHeader = {};

  if (accessToken.isValid) {
    headers["Authorization"] = `Bearer ${accessToken.value}`;
  }
  apiRequest('/forms', {headers});
  apiRequest('/records', {headers});
  // apiRequest('/tasks', {headers});

  return (
    <>
      {children}
    </>
  );
};