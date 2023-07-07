import { Page, Text } from '@modules/core/components';
import { DatePicker } from '@modules/date/components';
import { useDateContext } from '@modules/date/contexts';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export interface TasksPageProps {}

const TasksPage : React.FC<TasksPageProps> = () => {
  const { t } = useTranslation();
  const { value: date } = useDateContext();

  return (
    <Page testId="home page">
      <DatePicker />
      <Outlet />
    </Page>
  );
};

export default TasksPage