import { StyledListItem } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { Notification } from '@modules/notifications/types';
import { ListItemButton, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem : React.FC<NotificationItemProps>= ({
  notification
}) => {
  const { set } = useDateContext();
  const handleClick = (date: Date) => {
    set(dayjs(date));
  }
  return (
    <StyledListItem>
      <ListItemButton onClick={() => handleClick(notification.newDate)}>
        <ListItemText primary={notification.content}/>
      </ListItemButton>
    </StyledListItem>
  );
};