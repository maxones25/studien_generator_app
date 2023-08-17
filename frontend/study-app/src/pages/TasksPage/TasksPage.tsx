import { Page } from '@modules/core/components';
import { DatePicker } from '@modules/date/components';
import { FormDialog } from '@modules/forms/components';
import { RecordedEventsList, ScheduleList } from '@modules/tasks/components';
import React from 'react';

export interface TasksPageProps {}

const TasksPage : React.FC<TasksPageProps> = () => {

  return (
    <Page padding={1.5} testId="tasks page">
      <DatePicker />
      <ScheduleList />
      <RecordedEventsList />
      <FormDialog />
    </Page>
  );
};

export default TasksPage