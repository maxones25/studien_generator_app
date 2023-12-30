import { LoginFormData } from '@modules/auth/types';
import { Button } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { Dialog, DialogActions } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface QrCodeReaderDialogProps {
  open: boolean;
  close: VoidFunction;
  setValues: (loginData: LoginFormData) => void;
}

export const QrCodeReaderDialog : React.FC<QrCodeReaderDialogProps>= ({
  open,
  close,
  setValues,
}) => {
  const { t } = useTranslation();
  const { showSuccess } = useSnackBarContext();

  return (
    <Dialog open={open} onClose={close} fullWidth>
      <QrScanner 
        constraints={{}}
        onDecode={(result) => {
          console.log(result)
          setValues(JSON.parse(result));
          showSuccess(t('qrcode-success'));
          close();
        }}
        onError={(error) => console.log(error)}
      />
      <DialogActions>
        <Button
          testId='qrcode-cancel-button'
          onClick={close}
          color={'error'}
        >
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};