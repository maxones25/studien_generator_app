import { LoginFormData } from '@modules/auth/types';
import { Button } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { Dialog, DialogActions } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrReader } from 'react-qr-reader';

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
      <QrReader 
        constraints={{}}
        onResult={(result, error) => {
          if (!!result) {
            const text = (result?.getText());
            console.log(text)
            setValues(JSON.parse(text));
            showSuccess(t('qrcode-success'));
          }
          if (!!error) {
          }
        }}
      />
      <DialogActions>
        <Button
          testId='qrcode-cancel-button'
          onClick={close}
        >
          {t('back')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};