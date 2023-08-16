import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Task } from '@modules/tasks/types';
import { StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';

export interface TaskItemProps {
  task: Task;
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
}) => {
  const handleClick = (id: string, name: string) => {
    console.log(id, name);
  };

  const date = task.postponedTo ? task.postponedTo : task.scheduledAt;
  const dateString = dayjs(date).format('HH:mm')

  return (
    <StyledListItem
      key={task.id}
    >
      <ListItemButton onClick={() => handleClick(task.id, task.name)}>
        <ListItemText primary={task.name} secondary={dateString}/>
      </ListItemButton>
    </StyledListItem>
  );
}