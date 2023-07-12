import { Column, List, Text } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { useGetTasksByDate } from '@modules/tasks/hooks';
import React from 'react';

export interface TasksListProps {}

export const TasksList : React.FC<TasksListProps> = ({
  
}) => {
  const date = useDateContext();
  const getTasks = useGetTasksByDate({date: date.value});

  return (
    <Column>
      <Text>Aufgaben</Text>
      <List 
        title='tasks'
        getListItems={getTasks}
        handleClick={() => {}}
      />
    </Column>
  );
};