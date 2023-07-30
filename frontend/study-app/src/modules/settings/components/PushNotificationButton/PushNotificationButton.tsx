import { useMessageContext } from '@modules/core/contexts';
import { useMessage } from '@modules/core/hooks';
import { MessageType } from '@modules/core/types';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface PushNotificationButtonProps {}

export const PushNotificationButton : React.FC<PushNotificationButtonProps>= ({

}) => {
  const [permission, setPermission] = useState<PermissionState|undefined>(undefined);
  const { t } = useTranslation();
  const { postMessage } = useMessage();
  const { message } = useMessageContext();

  const onAcceptNotifications = async () => {
    postMessage(MessageType.Subcribe)
  };

  useEffect(() => {
    navigator.serviceWorker.getRegistration().then((sw) => {
      sw?.pushManager.permissionState({userVisibleOnly: true}).then((permission) => {
        setPermission(permission);
      })
    })
  },[message])

  return (
    <Button 
      disabled={permission !== 'prompt'}
      onClick={onAcceptNotifications}
    >
      {t(permission ?? 'default')}
    </Button>
  );
};