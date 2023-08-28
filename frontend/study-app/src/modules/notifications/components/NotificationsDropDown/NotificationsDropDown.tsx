import { List } from '@modules/core/components';
import { useDeleteNotifications, useGetNotifications } from '@modules/notifications/hooks';
import { DeleteOutlined } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationItem } from '..';

export interface NotificationsDropDownProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  open: boolean;
}

export const NotificationsDropDown : React.FC<NotificationsDropDownProps>= ({
  anchorEl,
  handleClose,
  open,
}) => {
  const getNotifications = useGetNotifications();
  const { t } = useTranslation();
  const deleteNotifications = useDeleteNotifications();

  const handleDelete = (event: any) => {
    event.stopPropagation();
    deleteNotifications.mutate({});
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            right: 0,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
      <List
        title='notifications'
        isError={getNotifications.isError}
        isLoading={getNotifications.isLoading}
      >
        {getNotifications.data?.map((item) => {
          return <NotificationItem key={item.id} notification={item}/>
        })}
      </List>
      <MenuItem 
        data-testid={'delete-notifications-app-bar'} 
        onClick={handleDelete}
      >
        <ListItemIcon>
          <DeleteOutlined fontSize="small" />
        </ListItemIcon>
        {t('delete all')}
      </MenuItem>
    </Menu>
  );
};