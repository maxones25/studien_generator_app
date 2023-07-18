import { FormDataProvider, FormProvider, useFormIdContext } from '@modules/forms/contexts';
import { Dialog } from '@mui/material';
import React from 'react';
import { Form } from '..';

export interface FormDialogProps {
}

export const FormDialog : React.FC<FormDialogProps>= ({
}) => {
  const {hasFormId, resetForm} = useFormIdContext();

  return (
    <Dialog open={hasFormId} onClose={resetForm}>
      <FormProvider>
        <FormDataProvider>
          <Form />
        </FormDataProvider>
      </FormProvider>
    </Dialog>
  );
};