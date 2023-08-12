import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PushNotificationButton } from '..';
import TrafficLight from '@modules/core/components/TrafficLight/TrafficLight';
import { useGetQueueStatus } from '@modules/settings/hooks';

export interface SettingsListProps {}

export const SettingsList : React.FC<SettingsListProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { getQueueStatus } = useGetQueueStatus();

  return (
    <List>
      <ListItem 
        secondaryAction = {<PushNotificationButton/>}
      >
        <ListItemText 
          primary={t('push notifications')}
        />
      </ListItem>
      <ListItem 
        secondaryAction = {<TrafficLight status={ getQueueStatus() }/>}
      >
        <ListItemText 
          primary={t('queue status')}
        />
      </ListItem>
    </List>
  );
};