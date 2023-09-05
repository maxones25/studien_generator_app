import { ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Task } from '@modules/tasks/types';
import { IconButton, StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';
import { useFormIdContext } from '@modules/forms/contexts';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { RescheduleDialog } from '..';

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
  const { setForm } = useFormIdContext();
  const timeDiff = dayjs(task.scheduledAt).diff(new Date(), 'hour');
  const [ open, setOpen ] = useState(false); 
  const state = task.completedAt ? TasksStates.Completed : 
  timeDiff > 0 ? TasksStates.InActive : 
  timeDiff < -1 ? TasksStates.Failed :
  TasksStates.Active;

  const handleStart = () => {
    if (state === TasksStates.Active)
      setForm(task.formId, task.name, task.id);
  }

  const date = task.scheduledAt;
  const dateString = dayjs(date).format('HH:mm');

  return (
    <StyledListItem 
      secondaryAction={
        task.schedule.postpone && 
        task.rescheduled < task.schedule.postpone.times &&
        state !== TasksStates.Failed &&
        state !== TasksStates.Completed &&
        <IconButton 
          testId='reschedule task'
          edge="end"
          Icon={
            <ArrowForwardOutlined />
          }
          onClick={() => setOpen(true)}
        />
      }
      sx={{ backgroundColor: state }}>
      <ListItemButton onClick={handleStart}>
        <ListItemText primary={task.name} secondary={dateString}/>
      </ListItemButton>
      <RescheduleDialog task={task} open={open} onClose={() => setOpen(false)} />
    </StyledListItem>
  );
}