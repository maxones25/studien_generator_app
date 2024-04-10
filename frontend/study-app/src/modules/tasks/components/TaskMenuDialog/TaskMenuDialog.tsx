import React, { useMemo } from 'react';
import { Dialog, List, ListItem, DialogTitle, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import ForwardIcon from '@mui/icons-material/Forward';
import CloseIcon from '@mui/icons-material/Close';
import { useFormIdContext } from '@modules/forms/contexts'; // Angenommen, dieser Kontext existiert und ist korrekt
import { Task } from '@modules/tasks/types'; // Angenommen, diese Imports sind korrekt
import { getTaskState, mapRecords, TasksStates } from '@modules/tasks/utils';
import { ObjectInfoDialog } from '@modules/core/components';
import { useOpen } from '@modules/core/hooks';
import { RescheduleDialog } from '..';
import { useGetRecords } from '@modules/tasks/hooks';
import { useGetForm } from '@modules/forms/hooks';
import { RecordField, findFormField } from '@modules/forms/types';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, task }) => {
  const { setForm } = useFormIdContext();
  const state = useMemo(() => getTaskState(task), [task]);
  const { isOpen, open: infoOpen, close } = useOpen(false);
  const { isOpen: rescheduleIsOpen, open: rescheduleOpen, close: rescheduleClose} = useOpen(false);
  const record = useGetRecords().data?.filter(record => record.taskId === task.id)?.[0];
  const form = useGetForm({formId: task.formId});
  const fields: RecordField[] = record?.fields?.map((field: RecordField) => {
    if (form.data != undefined)
      return {
      ...findFormField(form.data, field.formFieldId),
      value: field.value,
    }
  });
  const info = mapRecords({...task, fields});

  // Funktion zum Starten des Tasks
  const handleStart = () => {
    if (state === TasksStates.Active) {
      setForm(task.formId, task.name, task.id);
      onClose(); // Schließt den Dialog nach dem Start
    }
  };

  const isPostonable = 
    task?.schedule?.postpone &&
    task.rescheduled < task.schedule.postpone.times &&
    state !== TasksStates.Failed &&
    state !== TasksStates.Completed

  return  (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: state}}>
        {task.name}
      </DialogTitle>
      <List sx={{minWidth: '60vw', color: 'black'}}>
        <ListItem>
          <Button
            fullWidth
            color='inherit'
            sx={{justifyContent: 'flex-start'}}
            onClick={handleStart}
            disabled={state !== TasksStates.Active}
            startIcon={<PlayArrowIcon />}>
            Start
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color='inherit'
            sx={{justifyContent: 'flex-start'}}
            onClick={infoOpen}
            startIcon={<InfoIcon />}>
            Info
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color='inherit'
            sx={{justifyContent: 'flex-start'}}
            disabled={!isPostonable}
            onClick={rescheduleOpen}
            startIcon={<ForwardIcon />}>
            Verschieben
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color='inherit'
            sx={{justifyContent: 'flex-start'}}
            onClick={onClose}
            startIcon={<CloseIcon />}>
            Abbrechen
          </Button>
        </ListItem>
      </List>
      <RescheduleDialog task={task} open={rescheduleIsOpen} onClose={rescheduleClose} />
      <ObjectInfoDialog open={isOpen} close={close} title={task.name} info={info}/>
    </Dialog>
  );
};
