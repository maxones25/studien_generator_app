import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Appointment } from '@modules/tasks/types';
import { StyledListItem } from '@modules/core/components';
import dayjs from 'dayjs';

export interface AppointmentItemProps {
  appointment: Appointment;
}

export const AppointmentItem : React.FC<AppointmentItemProps>= ({
  appointment,
}) => {
  const handleClick = (id: string, name: string) => {
    console.log(id, name);
  };

  const endString = appointment.end ? ` - ${dayjs(appointment.end).format('HH:mm')}` : '';
  const dateString = dayjs(appointment.start).format('HH:mm') + endString;

  return (
    <StyledListItem>
      <ListItemButton onClick={() => handleClick(appointment.id, appointment.name)}>
        <ListItemText primary={appointment.name} secondary={dateString}/>
      </ListItemButton>
    </StyledListItem>
  );
}