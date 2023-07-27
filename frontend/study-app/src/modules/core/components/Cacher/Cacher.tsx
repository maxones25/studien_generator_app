import { useGetEvents } from '@modules/events/hooks';
import { useGetForms } from '@modules/forms/hooks';
import React, { ReactNode } from 'react';

export interface CacherProps {
  children: ReactNode;
}

export const Cacher : React.FC<CacherProps>= ({
  children,
}) => {
  useGetForms();
  useGetEvents();

  return (
    <>
      {children}
    </>
  );
};