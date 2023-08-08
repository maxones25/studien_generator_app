import { useGetForms } from '@modules/forms/hooks';
import { useGetTasks } from '@modules/tasks/hooks';
import React, { ReactNode } from 'react';

export interface CacherProps {
  children: ReactNode;
}

export const Cacher : React.FC<CacherProps>= ({
  children,
}) => {

  useGetForms();
  useGetTasks();

  return (
    <>
      {children}
    </>
  );
};