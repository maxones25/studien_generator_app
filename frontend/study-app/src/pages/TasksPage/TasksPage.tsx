import { Page } from '@modules/core/components';
import { DatePicker } from '@modules/date/components';
import { AppointmentsList, RecordedEventsList, TasksList } from '@modules/tasks/components';
import React from 'react';

export interface TasksPageProps {}

const TasksPage : React.FC<TasksPageProps> = () => {

  return (
    <Page testId="tasks page">
      <DatePicker />
      <TasksList />
      <AppointmentsList />
      <RecordedEventsList />
    </Page>
  );
};

export default TasksPage