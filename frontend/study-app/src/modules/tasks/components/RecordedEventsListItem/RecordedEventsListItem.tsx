import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { StyledListItem, Text } from '@modules/core/components';
import { Record } from '@modules/forms/types';
import dayjs from 'dayjs';

export interface RecordedEventsListItemProps {
  record: Record;
}

export const RecordedEventsListItem : React.FC<RecordedEventsListItemProps>= ({
  record,
}) => {
  const handleClick = (record: Record) => {
    console.log(record);
  };
  const dateString = dayjs(record.createdAt).format('HH:mm');

  return (
    <StyledListItem secondaryAction={<Text fontSize={'0.875rem'}>{dateString}</Text>}>
      <ListItemButton onClick={() => handleClick(record)}>
        <ListItemText primary={record.name}/>
      </ListItemButton>
    </StyledListItem>
  );
};