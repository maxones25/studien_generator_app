import { Button, HelpButton, Text } from '@modules/core/components';
import TrafficLight from '@modules/core/components/TrafficLight/TrafficLight';
import { useGetQueueStatus } from '@modules/settings/hooks';
import { List, ListItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordDialog, PushNotificationButton } from '..';
import { useOpen } from '@modules/core/hooks';


export interface SettingsListProps {}

export const SettingsList : React.FC<SettingsListProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { getQueueStatus } = useGetQueueStatus();
  const link = "https://www.connecto.io/kb/knwbase/how-to-unsubscribe-from-chrome-notifications-on-web-and-android/#:~:text=Open%20chrome%20on%20your%20android,%E2%80%9CSettings%E2%80%9D%20from%20the%20menu.&text=On%20the%20Notifications%20tab%2C%20you,permitted%20to%20send%20you%20notifications."
  const { open, isOpen, close } = useOpen(false);

  return (
    <List>
      <ListItem 
        secondaryAction = {<PushNotificationButton/>}
      >
        <Text>
          {t('push notifications')}
        </Text>
        <HelpButton title='push notifications' body={
          <a target="_blank" href={link}>Link</a>
        }/>
      </ListItem>
      <ListItem 
        secondaryAction = {<TrafficLight status={ getQueueStatus() }/>}
      >
        <Text>
          {t('data status')}
        </Text>
        <HelpButton title='data status' body='data status body'/>
      </ListItem>
      <ListItem
        secondaryAction = {
          <Button
            testId='change-password-button'
            onClick={open}
          >{t('change')}</Button>}
      >
        <Text>
          {t('change password')}
        </Text>
      </ListItem>
    <ChangePasswordDialog open={isOpen} close={close}/>
    </List>
  );
};