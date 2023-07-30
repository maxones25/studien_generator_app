import { useMessage } from '@modules/core/hooks';
import { MessageType } from '@modules/core/types';
import React, { ReactNode } from 'react';

export interface CacherProps {
  children: ReactNode;
}

export const Cacher : React.FC<CacherProps>= ({
  children,
}) => {
  const { postMessage } = useMessage();
  postMessage(MessageType.FetchAndCache, '/forms');
  postMessage(MessageType.FetchAndCache, '/tasks');

  return (
    <>
      {children}
    </>
  );
};