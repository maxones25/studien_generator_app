import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Record } from '@modules/tasks/types';
import React from 'react';

export interface RecordedEventsListItemProps {
  record: Record;
  divider: boolean;
}

export const RecordedEventsListItem : React.FC<RecordedEventsListItemProps>= ({
  record,
  divider
}) => {
  const handleClick = (id: string, name: string) => {

  }

  return (
    <ListItem
      key={record.id}
      divider={divider}
    >
      <ListItemButton onClick={() => handleClick(record.id, record.name)}>
        <ListItemText primary={record.name}/>
      </ListItemButton>
    </ListItem>
  );
};