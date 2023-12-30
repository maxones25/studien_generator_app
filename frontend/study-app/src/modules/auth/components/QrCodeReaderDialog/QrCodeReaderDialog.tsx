import { LoginFormData } from '@modules/auth/types';
import { Button } from '@modules/core/components';
import { useSnackBarContext } from '@modules/core/contexts';
import { useValue } from '@modules/core/hooks';
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
  const { value, set } = useValue(false);
  const onClose = () => {
    set(false);
    close();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <QrReader 
        constraints={{}}
        onResult={(result, error) => {
          if (!!result) {
            const text = (result?.getText());
            console.log(text)
            setValues(JSON.parse(text));
            showSuccess(t('qrcode-success'));
            set(true);
          }
          if (!!error) {
          }
        }}
      />
      <DialogActions>
        <Button
          testId='qrcode-cancel-button'
          onClick={onClose}
          color={value ? 'primary' : 'error'}
        >
          {t(value ? 'continue' : 'cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};