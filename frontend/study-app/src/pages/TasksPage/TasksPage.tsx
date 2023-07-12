import { Page, Text } from '@modules/core/components';
import { DatePicker } from '@modules/date/components';
import { FiledRecordsList, TasksList } from '@modules/tasks/components';
import React from 'react';

export interface TasksPageProps {}

const TasksPage : React.FC<TasksPageProps> = () => {

  return (
    <Page testId="home page">
      <DatePicker />
      <TasksList />
      <FiledRecordsList />
    </Page>
  );
};

export default TasksPage