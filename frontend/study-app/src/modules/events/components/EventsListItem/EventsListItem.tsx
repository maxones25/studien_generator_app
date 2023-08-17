import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Event } from '@modules/events/types';
import { useFormIdContext } from '@modules/forms/contexts';
import { StyledListItem } from '@modules/core/components';

export interface EventsListItemProps {
  event: Event;
}

export const EventsListItem : React.FC<EventsListItemProps>= ({
  event,
}) => {
  const { setForm } = useFormIdContext();
  
  const handleClick = (id: string, name: string) => {
    setForm(id, name);
  };

  return (
    <StyledListItem
      key={event.id}
      sx={{marginX: 2}}
    >
      <ListItemButton onClick={() => handleClick(event.id, event.name)}>
        <ListItemText primary={event.name}/>
      </ListItemButton>
    </StyledListItem>
  );
}