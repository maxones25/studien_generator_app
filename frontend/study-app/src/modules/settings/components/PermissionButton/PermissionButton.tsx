import { useSnackBarContext } from '@modules/core/contexts';
import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface PermissionButtonProps {}

export const PermissionButton : React.FC<PermissionButtonProps>= ({

}) => {
  const permission = window.Notification.permission;
  const { t } = useTranslation();

  const { showError, showSuccess } = useSnackBarContext();

  const onAcceptNotifications = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission === 'granted') {
      showSuccess(t('notifications accepted'));
    } else {
      showError(t('notifications denied'));
    }
  };

  return (
    <Button 
      disabled={permission !== 'default'}
      onClick={onAcceptNotifications}
    >
      {t('permission-' + permission)}
    </Button>
  );
};