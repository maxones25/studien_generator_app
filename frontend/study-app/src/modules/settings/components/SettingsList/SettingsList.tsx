import { List, ListItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PushNotificationButton } from '..';
import TrafficLight from '@modules/core/components/TrafficLight/TrafficLight';
import { useGetQueueStatus } from '@modules/settings/hooks';
import { HelpButton, Text } from '@modules/core/components';

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
        <Text>
          {t('push notifications')}
        </Text>
        <HelpButton title='push notifications' body=''/>
      </ListItem>
      <ListItem 
        secondaryAction = {<TrafficLight status={ getQueueStatus() }/>}
      >
        <Text>
          {t('queue status')}
        </Text>
        <HelpButton title='push notifications' body=''/>
      </ListItem>
    </List>
  );
};