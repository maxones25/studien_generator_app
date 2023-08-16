import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Appointment } from '@modules/tasks/types';

export interface AppointmentItemProps {
  appointment: Appointment;
}

export const AppointmentItem : React.FC<AppointmentItemProps>= ({
  appointment,
}) => {
  const handleClick = (id: string, name: string) => {
    console.log(id, name);
  };

  return (
    <ListItem
      key={appointment.id}
    >
      <ListItemButton onClick={() => handleClick(appointment.id, appointment.name)}>
        <ListItemText primary={appointment.name}/>
      </ListItemButton>
    </ListItem>
  );
}