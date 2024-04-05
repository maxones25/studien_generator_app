import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import {  StyledListItem, Text } from '@modules/core/components';
import { Record } from '@modules/forms/types';
import dayjs from 'dayjs';

export interface RecordedEventsListItemProps {
  record: Record;
}

export const RecordedEventsListItem : React.FC<RecordedEventsListItemProps>= ({
  record,
}) => {
  // const { isOpen, open: infoOpen, close } = useOpen(false);
  const dateString = dayjs(record.createdAt).format('HH:mm');

  return (
    <StyledListItem secondaryAction={<Text fontSize={'0.875rem'}>{dateString}</Text>}>
      <ListItemButton >
        <ListItemText primary={record.name}/>
      </ListItemButton>
      {/* <ObjectInfoDialog open={isOpen} close={close} title={record.name} info={record}/> */}
    </StyledListItem>
  );
};