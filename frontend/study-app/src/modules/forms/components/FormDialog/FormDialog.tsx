import { FormDataProvider, FormProvider, useFormIdContext } from '@modules/forms/contexts';
import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import { Form } from '..';
import { Button, Column, Row, Text } from '@modules/core/components';
import { t } from 'i18next';

export interface FormDialogProps {
}

export const FormDialog : React.FC<FormDialogProps>= ({
}) => {
  const [open, setOpen] = useState(false);
  const {hasFormId, resetForm} = useFormIdContext();

  const cancelForm = () => {
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog open={hasFormId} onClose={() => setOpen(true)}>
      <FormProvider>
        <FormDataProvider>
          <Form />
        </FormDataProvider>
      </FormProvider>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Column m={2}>
          <Text>{t('cancel form question')}</Text>
          <Row mt={2}>
            <Button 
              testId='cancel-cancel-form'
              onClick={() => setOpen(false)}
              sx={{m: 1}}
            >{t("continue")}</Button>
            <Button 
              color='error'
              testId='accept-cancel-form'
              onClick={cancelForm}
              sx={{m: 1}}
            >{t("cancel")}</Button>
          </Row>
        </Column>
      </Dialog>
    </Dialog>
  );
};