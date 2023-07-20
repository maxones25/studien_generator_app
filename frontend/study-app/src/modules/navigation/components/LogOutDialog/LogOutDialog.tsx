import { useAccessTokenContext } from '@modules/auth/contexts';
import { Button, Column, Row, Text } from '@modules/core/components';
import { Dialog } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface LogOutDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LogOutDialog : React.FC<LogOutDialogProps> = ({
  open,
  onClose
}) => {
  const { t } = useTranslation();
  const accessToken = useAccessTokenContext();

  const logOut = () => {
    accessToken.reset();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Column m={2}>
        <Text>{t('logout question')}</Text>
        <Row mt={2}>
          <Button 
            testId='cancel-logout'
            onClick={onClose}
            sx={{m: 1}}
          >{t("cancel")}</Button>
          <Button 
            color='error'
            testId='accept-logout'
            onClick={logOut}
            sx={{m: 1}}
          >{t("logout")}</Button>
        </Row>
      </Column>
    </Dialog>
  );
};