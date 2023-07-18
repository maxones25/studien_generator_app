import { useDateContext } from '@modules/date/contexts';
import { Dialog } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';

export interface DateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DateDialog : React.FC<DateDialogProps> = ({
  open,
  onClose
}) => {
  const { value, set } = useDateContext();

  return (
    <Dialog open={open} onClose={onClose} sx={{m: 0}}>
      <StaticDatePicker 
        defaultValue={dayjs(value)} 
        slots={{
          toolbar: undefined,
        }}
        slotProps={{
          actionBar: {
            actions: ['today', 'cancel', 'accept'],
          },
        }}
        onAccept={(value) => set(value!)}
        onClose={onClose}
      />
    </Dialog>
  );
};