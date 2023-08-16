import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Task } from '@modules/tasks/types';

export interface TaskItemProps {
  task: Task;
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
}) => {
  const handleClick = (id: string, name: string) => {
    console.log(id, name);
  };

  return (
    <ListItem
      key={task.id}
    >
      <ListItemButton onClick={() => handleClick(task.id, task.name)}>
        <ListItemText primary={task.name}/>
      </ListItemButton>
    </ListItem>
  );
}