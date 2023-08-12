import { CalendarListItem } from '@modules/calendar/types';
import { getDateFromItem } from '@modules/calendar/utils';
import { ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export interface CalendarDateListItemProps {
  item: CalendarListItem;
}

export const CalendarDateListItem : React.FC<CalendarDateListItemProps>= ({
  item,
}) => {

  const date = getDateFromItem(item);

  return (
    <ListItem
      secondaryAction={
        <ListItemText primary={dayjs(date).locale('de').format('HH:mm')}/>
      }
    >
      <ListItemText primary={item.name}/>
    </ListItem>
  );
};