import React, { useState } from 'react';
import { Button } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { useSubscribePush } from '@modules/settings/hooks';
import { urlB64ToUint8Array } from '@modules/settings/utils';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

interface PushNotificationButtonProps {}

const PushNotificationButton: React.FC<PushNotificationButtonProps> = () => {
  const { t } = useTranslation();
  const { showError } = useSnackBarContext();
  const { palette } = useTheme();
  const subscribe = useSubscribePush();
  const [loading, setLoading] = useState(false);

  const permission = window?.Notification?.permission;

  const getButtonColor = () => {
    switch (permission) {
      case 'granted':
        return palette.success.main;
      case 'denied':
        return palette.error.main;
      default:
        return palette.grey[500];
    }
  };

  const onAcceptNotifications = async () => {
    setLoading(true);
    try {
      const sw = await navigator.serviceWorker.getRegistration();
      const applicationServerKey = urlB64ToUint8Array(VAPID_PUBLIC_KEY);
      const options = { applicationServerKey, userVisibleOnly: true };
      const subscription = await sw?.pushManager.subscribe(options);
      await subscribe.mutateAsync({ subscription: JSON.stringify(subscription) });
    } catch (err: any) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      testId='push-notification-button'
      sx={{
        "&.Mui-disabled": {
          backgroundColor: getButtonColor(),
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

export default PushNotificationButton;
