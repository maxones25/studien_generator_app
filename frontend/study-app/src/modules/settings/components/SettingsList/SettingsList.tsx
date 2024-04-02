import { Button } from '@modules/core/components';
import TrafficLight from '@modules/core/components/TrafficLight/TrafficLight';
import { useGetParticipantInfo, useGetQueueStatus } from '@modules/settings/hooks';
import { Divider, List } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordDialog, ParticipantInfoDialog, PushNotificationButton, SettingsListItem, TrafficLightExplanationDialog } from '..';
import { useOpen } from '@modules/core/hooks';


export interface SettingsListProps {}

export const SettingsList : React.FC<SettingsListProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { getQueueStatus } = useGetQueueStatus();
  const { open: openPassword, isOpen: isOpenPassword, close: closePassword } = useOpen(false);
  const { open: openParticipantInfo, isOpen: isOpenParticipantInfo, close: closeParticipantInfo } = useOpen(false);
  const { open: openTrafficLightInfo, isOpen: isOpenTrafficLightInfo, close: closeTrafficLightInfo } = useOpen(false);
  const participant = useGetParticipantInfo();

  return (
    <List sx={{p: '0px 5vw'}}>
      <PushNotificationButton/>
      <Divider />
      <SettingsListItem title='data status' status={
        <TrafficLight status={ getQueueStatus() }/>
      }>
        <Button onClick={openTrafficLightInfo} color='info' size='small' testId='data-status-info'>{t('info')}</Button>
      </SettingsListItem>
      <Divider />
      <SettingsListItem title='account' status={
          participant.data?.number || ''
          }>
          <Button
            color='info'
            size='small'
            testId='account-inof'
            onClick={openParticipantInfo}
          >{t('info')}</Button>
          <Button
            size='small'
            testId='change-password-button'
            onClick={openPassword}
          >{t('change password')}</Button>
      </SettingsListItem>
    <ChangePasswordDialog open={isOpenPassword} close={closePassword}/>
    <ParticipantInfoDialog open={isOpenParticipantInfo} close={closeParticipantInfo} info={participant.data} />
    <TrafficLightExplanationDialog open={isOpenTrafficLightInfo} onClose={closeTrafficLightInfo} />
    </List>
  );
};