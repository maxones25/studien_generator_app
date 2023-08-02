import { useSnackBarContext } from '@modules/core/contexts';
import { useSubscribePush } from '@modules/settings/hooks';
import { urlB64ToUint8Array } from '@modules/settings/utils/utils';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

export interface PushNotificationButtonProps {}

export const PushNotificationButton : React.FC<PushNotificationButtonProps>= ({

}) => {
  const [permission, setPermission] = useState<string>('accept');
  const { t } = useTranslation();
  const { showError } = useSnackBarContext();
  const subscribe = useSubscribePush();

  const onAcceptNotifications = async () => {
    navigator.serviceWorker.getRegistration().then(async(sw) => {
      try {
        const applicationServerKey = urlB64ToUint8Array(
          VAPID_PUBLIC_KEY
        );
        const options = { applicationServerKey, userVisibleOnly: true };
        const subscription = await sw?.pushManager.subscribe(options);  
        setPermission('accepted')  
        subscribe.mutateAsync({
          subscription: JSON.stringify(subscription)
        });       
      } catch (err: any) {
        setPermission('denied')
        showError(err);
      }
    });
  };

  useEffect(() => {
    if(!navigator.serviceWorker) {
      setPermission('denied')
    }
  },[])

  return (
    <Button 
      disabled={permission !== 'accept'}
      onClick={onAcceptNotifications}
    >
      {t(permission ?? 'default')}
    </Button>
  );
};