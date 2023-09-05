import { ListItemButton, ListItemText } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Task } from '@modules/tasks/types';
import { IconButton, StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';
import { useFormIdContext } from '@modules/forms/contexts';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { RescheduleDialog } from '..';
import { TasksStates, getTaskState } from '@modules/tasks/utils';

export interface TaskItemProps {
  task: Task;
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
}) => {
  const { setForm } = useFormIdContext();
  const [ open, setOpen ] = useState(false); 
  const state = useMemo(() => {
    return getTaskState(task);
  }, [task]);

  const handleStart = () => {
    if (state === TasksStates.Active)
      setForm(task.formId, task.name, task.id);
  }

  const date = task.scheduledAt;
  const dateString = dayjs(date).format('HH:mm');

  return (
    <StyledListItem 
      secondaryAction={
        task?.schedule?.postpone && 
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