import { ListItemButton, ListItemText } from '@mui/material';
import React, { useMemo } from 'react';
import { Task } from '@modules/tasks/types';
import { StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';
import { getTaskState } from '@modules/tasks/utils';
import { TaskDialog } from '..';
import { useOpen } from '@modules/core/hooks';
import { formatiOSDateShortWithTime } from '@modules/date/utils';
import { useDateContext } from '@modules/date/contexts';

export interface TaskItemProps {
  task: Task;
}

export const TaskItem : React.FC<TaskItemProps>= ({
  task,
}) => {
  const { isOpen, open, close } = useOpen(false); 
  const { date } = useDateContext();
  const state = useMemo(() => {
    return getTaskState(task);
  }, [task]);

  const completedDateString = task.completedAt ? ' - erledigt: ' + (
    dayjs(task.completedAt).isSame(date, 'd') ? 
    dayjs(task.completedAt).format('HH:mm') :
    formatiOSDateShortWithTime(task?.completedAt) ):
    '';

  const dateString = 'geplant: ' + dayjs(task.scheduledAt).format('HH:mm') + completedDateString;

  return (
    <StyledListItem 
      sx={{ backgroundColor: state }}>
      <ListItemButton onClick={open}>
        <ListItemText primary={task.name} secondary={dateString}/>
      </ListItemButton>
      <TaskDialog open={isOpen} onClose={close} task={task}/>
    </StyledListItem>
  );
}