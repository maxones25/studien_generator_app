import { ListItemButton, ListItemText } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Task } from '@modules/tasks/types';
import { StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';
import { useFormIdContext } from '@modules/forms/contexts';
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
  const dateString = task.completedAt ? 
    'abgeschlossen: ' + dayjs(task.completedAt).format('HH:mm') : 
    'geplant: ' + dayjs(task.scheduledAt).format('HH:mm');

  // task?.schedule?.postpone && 
  // task.rescheduled < task.schedule.postpone.times &&
  // state !== TasksStates.Failed &&
  // state !== TasksStates.Completed &&
  // <IconButton 
  //   testId='reschedule task'
  //   edge="end"
  //   Icon={
  //     <ArrowForwardOutlined />
  //   }
  //   onClick={() => setOpen(true)}
  // />

  return (
    <StyledListItem 
      sx={{ backgroundColor: state }}>
      <ListItemButton onClick={handleStart}>
        <ListItemText primary={task.name} secondary={dateString}/>
      </ListItemButton>
      <RescheduleDialog task={task} open={open} onClose={() => setOpen(false)} />
    </StyledListItem>
  );
}