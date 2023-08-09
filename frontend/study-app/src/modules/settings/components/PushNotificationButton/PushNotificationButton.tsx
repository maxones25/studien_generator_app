import { Button } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { useSubscribePush } from '@modules/settings/hooks';
import { urlB64ToUint8Array } from '@modules/settings/utils/utils';
import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

export interface PushNotificationButtonProps {}

export const PushNotificationButton : React.FC<PushNotificationButtonProps>= ({

}) => {
  const { t } = useTranslation();
  const { showError } = useSnackBarContext();
  const subscribe = useSubscribePush();
  const permission = window.Notification.permission;
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();

  const onAcceptNotifications = async () => {
    navigator.serviceWorker.getRegistration().then(async(sw) => {
      setLoading(true);
      try {
        const applicationServerKey = urlB64ToUint8Array(
          VAPID_PUBLIC_KEY
        );
        const options = { applicationServerKey, userVisibleOnly: true };
        const subscription = await sw?.pushManager.subscribe(options);   
        subscribe.mutateAsync({
          subscription: JSON.stringify(subscription)
        });       
      } catch (err: any) {
        showError(err);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Button
      testId='push-notification-button' 
      sx={{
        "&.Mui-disabled": {
          backgroundColor: permission === 'granted' ? 
            palette.success.main : 
            permission === 'denied' ?
               palette.error.main :
               palette.grey[500],
          color: palette.primary.contrastText
        },
        paddingX: '12px',
        minWidth: '130px'
      }}
      disabled={permission !== 'default'}
      isLoading={loading}
      onClick={onAcceptNotifications}
    >
      {t('permission-' + permission)}
    </Button>
  );
};