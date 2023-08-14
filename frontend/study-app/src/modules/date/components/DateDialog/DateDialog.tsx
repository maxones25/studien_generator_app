import { useDateContext } from '@modules/date/contexts';
import { Dialog, styled } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';

export interface DateDialogProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)(({  }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    // Hier können Sie weitere Styles hinzufügen, wenn Sie möchten
  },
}));

export const DateDialog : React.FC<DateDialogProps> = ({
  open,
  onClose
}) => {
  const { date, set } = useDateContext();

  return (
    <StyledDialog data-testid={"date-dialog"} open={open} onClose={onClose} >
      <StaticDatePicker 
        defaultValue={dayjs(date)} 
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
    </StyledDialog>
  );
};