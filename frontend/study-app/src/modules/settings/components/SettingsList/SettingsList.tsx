import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PushNotificationButton } from '..';

export interface SettingsListProps {}

export const SettingsList : React.FC<SettingsListProps>= ({
  
}) => {
  const { t } = useTranslation();

  return (
    <List>
      <ListItem 
        secondaryAction = {<PushNotificationButton/>}
      >
        <ListItemText 
          primary={t('push notifications')}
        />
      </ListItem>
    </List>
  );
};