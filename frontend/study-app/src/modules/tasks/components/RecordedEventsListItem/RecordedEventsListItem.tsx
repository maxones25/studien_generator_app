import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Record } from '@modules/tasks/types';
import React from 'react';

export interface RecordedEventsListItemProps {
  record: Record;
}

export const RecordedEventsListItem : React.FC<RecordedEventsListItemProps>= ({
  record,
}) => {
  const handleClick = (id: string, name: string) => {
    console.log(id, name);
  };

  return (
    <ListItem
      key={record.id}
    >
      <ListItemButton onClick={() => handleClick(record.id, record.name)}>
        <ListItemText primary={record.name}/>
      </ListItemButton>
    </ListItem>
  );
};