import { Column, Text } from '@modules/core/components';
import { useMultiFormContext } from '@modules/forms/contexts';
import { Dialog } from '@mui/material';
import React from 'react';
import { FormPage } from '..';

export interface MultiFormDialogProps {}

export const MultiFormDialog : React.FC<MultiFormDialogProps> = ({

}) => {
  const { 
    handleSubmit, 
    multiForm, 
    resetForm, 
    hasForm,
    getCurrentPage,
  } = useMultiFormContext();




  return (
    <Dialog open={hasForm} onClose={resetForm}>
      <Column p={2}>
        <Text color="text.secondary">{multiForm?.title}</Text>
        <FormPage 
          onSubmit={handleSubmit}
          formData={getCurrentPage()}
        />
      </Column>
    </Dialog>
  );
};