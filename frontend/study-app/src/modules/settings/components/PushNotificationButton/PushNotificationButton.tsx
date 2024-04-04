import React, { useEffect, useState } from 'react';
import { Button, Text } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { useDeleteSubscription, useSubscribePush } from '@modules/settings/hooks';
import { SubscriptionState, deleteSubscriptionLocal, isCorrectSubscription, saveSubscriptionLocal, urlB64ToUint8Array } from '@modules/settings/utils';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAccessTokenContext } from '@modules/auth/contexts';
import { SettingsListItem, SubscriptionInfoDialog } from '..';
import { useOpen } from '@modules/core/hooks';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;



interface PushNotificationButtonProps {}

export const PushNotificationButton: React.FC<PushNotificationButtonProps> = () => {
  const { t } = useTranslation();
  const { showError } = useSnackBarContext();
  const { palette } = useTheme();
  const subscribe = useSubscribePush();
  const { participantId } = useAccessTokenContext();
  const [subscriptionState, setSubScriptionState] = useState(SubscriptionState.Loading);
  const deleteSubscription = useDeleteSubscription();
  const { open, isOpen, close } = useOpen(false);

  useEffect(() => {
    const getSubscriptionState = async (id: string) => {
      const permission = window?.Notification?.permission;
      if (permission === 'denied') {
        setSubScriptionState(SubscriptionState.Denied);
        return;
      }
      if (await isCorrectSubscription(id) && permission === 'granted') {
        setSubScriptionState(SubscriptionState.Granted);
        return;
      }
      setSubScriptionState(SubscriptionState.Default);
      return;
    }

    getSubscriptionState(participantId || '');
  },[]);

  const getButtonColor = () => {
    switch (subscriptionState) {
      case SubscriptionState.Granted:
        return palette.success.main;
      case SubscriptionState.Denied:
        return palette.error.main;
      default:
        return palette.grey[500];
    }
  };

  const onAcceptNotifications = async () => {
    setSubScriptionState(SubscriptionState.Loading);
    try {
      const sw = await navigator.serviceWorker.getRegistration();
      const applicationServerKey = urlB64ToUint8Array(VAPID_PUBLIC_KEY);
      const options = { applicationServerKey, userVisibleOnly: true };
      const subscription = await sw?.pushManager.subscribe(options);
      await subscribe.mutateAsync({ subscription: JSON.stringify(subscription) });
      await saveSubscriptionLocal(participantId || '', JSON.stringify(subscription))
      setSubScriptionState(SubscriptionState.Granted);
    } catch (err: any) {
      showError(err);
      const permission = window?.Notification?.permission;
      if (permission === 'denied') {
        setSubScriptionState(SubscriptionState.Denied);
        return;
      }
      setSubScriptionState(SubscriptionState.Default);
    }
  };

  const onDeleteSubscription = async () => {
    await deleteSubscription.mutateAsync(undefined);
    await deleteSubscriptionLocal(participantId || '');
    setSubScriptionState(SubscriptionState.Default);
  }

  return (
    <SettingsListItem 
      title='push notifications' 
      status={
        <Text color={getButtonColor}>{t('permission-' + subscriptionState)}</Text>
      }
    >
      <Button onClick={open} color='info' size='small' testId='info notifications'>{t('info')}</Button>
      <Button 
        disabled={subscriptionState !== SubscriptionState.Default} 
        size='small' 
        testId='accept notifications' 
        onClick={onAcceptNotifications}
        >{t('accept')}</Button>
      <Button 
        color='error'
        disabled={subscriptionState !== SubscriptionState.Granted} 
        size='small' 
        testId='retract notifications' 
        onClick={onDeleteSubscription}
        >{t('retract')}</Button>
      <SubscriptionInfoDialog open={isOpen} onClose={close} />
    </SettingsListItem>
  );
};
