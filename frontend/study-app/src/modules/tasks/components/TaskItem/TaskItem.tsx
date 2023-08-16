import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Task } from '@modules/tasks/types';

export interface TaskItemProps {
  task: Task;
  divider: boolean;
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
  divider
}) => {
  const handleClick = (id: string, name: string) => {

  }

  return (
    <ListItem
      key={task.id}
      divider={divider}
    >
      <ListItemButton onClick={() => handleClick(task.id, task.name)}>
        <ListItemText primary={task.name}/>
      </ListItemButton>
    </ListItem>
  );
}