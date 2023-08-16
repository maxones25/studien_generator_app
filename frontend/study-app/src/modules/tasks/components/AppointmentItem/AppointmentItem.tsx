import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Appointment } from '@modules/tasks/types';

export interface AppointmentItemProps {
  appointment: Appointment;
  divider: boolean;
}

export const AppointmentItem : React.FC<AppointmentItemProps>= ({
  appointment,
  divider
}) => {
  const handleClick = (id: string, name: string) => {

  }

  return (
    <ListItem
      key={appointment.id}
      divider={divider}
    >
      <ListItemButton onClick={() => handleClick(appointment.id, appointment.name)}>
        <ListItemText primary={appointment.name}/>
      </ListItemButton>
    </ListItem>
  );
}