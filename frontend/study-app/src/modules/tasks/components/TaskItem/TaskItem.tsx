import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Task } from '@modules/tasks/types';
import { StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';
import { useFormIdContext } from '@modules/forms/contexts';

export interface TaskItemProps {
  task: Task;
}

enum TasksStates {
  Active = '#85CEE4',
  InActive = '#E4E4E4',
  Completed = '#74BA59',
  Failed = '#C7361B',
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
}) => {
  const currentDate = new Date();
  const { setForm } = useFormIdContext();
  const state = task.completedAt ? TasksStates.Completed : 
  new Date(task.scheduledAt) > currentDate ? TasksStates.InActive : 
  dayjs(task.scheduledAt).diff(currentDate, 'hour') > 1 ? TasksStates.Failed :
  TasksStates.Active;

  const handleClick = () => {
    if (state === TasksStates.Active)
      setForm(task.formId, task.name, task.id);
  };
  const date = task.scheduledAt;
  const dateString = dayjs(date).format('HH:mm')

  return (
    <StyledListItem sx={{ backgroundColor: state }}>
      <ListItemButton onClick={() => handleClick()}>
        <ListItemText primary={task.name} secondary={dateString}/>
      </ListItemButton>
    </StyledListItem>
  );
}