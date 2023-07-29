import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface PushNotificationButtonProps {}

export const PushNotificationButton : React.FC<PushNotificationButtonProps>= ({

}) => {
  const [permission, setPermission] = useState<PermissionState|undefined>(undefined);
  const { t } = useTranslation();

  const onAcceptNotifications = async () => {
    navigator.serviceWorker.ready.then((registration) => {
      registration?.active?.postMessage("subscribe");
    });
  };

  useEffect(() => {
    navigator.serviceWorker.getRegistration().then((sw) => {
      sw?.pushManager.permissionState({userVisibleOnly: true}).then((permission) => {
        setPermission(permission);
      })
    })
  })

  return (
    <Button 
      disabled={permission !== 'prompt'}
      onClick={onAcceptNotifications}
    >
      {t(permission ?? 'default')}
    </Button>
  );
};