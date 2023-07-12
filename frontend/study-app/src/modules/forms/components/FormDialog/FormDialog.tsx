import { FormDataProvider, FormProvider, useFormIdContext } from '@modules/forms/contexts';
import { Dialog } from '@mui/material';
import React from 'react';
import { FormPage } from '..';
import { Column, Text } from '@modules/core/components';

export interface FormDialogProps {
}

export const FormDialog : React.FC<FormDialogProps>= ({
}) => {
  const {hasFormId, title, resetForm} = useFormIdContext();

  return (
    <Dialog open={hasFormId} onClose={resetForm}>
      <FormProvider>
        <FormDataProvider>
          <Column p={2}>
            <Text color="text.secondary">{title}</Text>
            <FormPage />
          </Column>
        </FormDataProvider>
      </FormProvider>
    </Dialog>
  );
};