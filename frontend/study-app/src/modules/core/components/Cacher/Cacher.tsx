import { useGetChatMessages } from '@modules/chat/hooks';
import { useGetForms } from '@modules/forms/hooks';
import { useGetNotifications } from '@modules/notifications/hooks';
import { useGetParticipantInfo } from '@modules/settings/hooks';
import { useGetAppointments, useGetTasks, useGetRecords } from '@modules/tasks/hooks';
import React, { ReactNode } from 'react';

export interface CacherProps {
  children: ReactNode;
}

export const Cacher : React.FC<CacherProps>= ({
  children,
}) => {

  useGetForms();
  useGetTasks();
  useGetRecords();
  useGetAppointments();
  useGetChatMessages();
  useGetNotifications();
  useGetParticipantInfo();

  return (
    <>
      {children}
    </>
  );
};