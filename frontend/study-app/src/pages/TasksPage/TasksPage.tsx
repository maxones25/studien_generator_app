import { Page } from '@modules/core/components';
import { DatePicker } from '@modules/date/components';
import { RecordedEventsList, ScheduleList } from '@modules/tasks/components';
import React from 'react';

export interface TasksPageProps {}

const TasksPage : React.FC<TasksPageProps> = () => {

  return (
    <Page testId="tasks page">
      <DatePicker />
      <ScheduleList />
      <RecordedEventsList />
    </Page>
  );
};

export default TasksPage