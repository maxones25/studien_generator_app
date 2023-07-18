import { useFormContext, useFormIdContext } from '@modules/forms/contexts';
import { CircularProgress } from '@mui/material';
import React from 'react';
import { FormPage } from '..';
import { Column, Text } from '@modules/core/components';
import { useTranslation } from 'react-i18next';

export interface FormProps {}

export const Form : React.FC<FormProps>= ({
  
}) => {
  const { form } = useFormContext();
  const { name } = useFormIdContext();
  const { t } = useTranslation();

  return (
  <Column p={2} width={"70vw"}>
    <Text color="text.secondary">{name}</Text>
    {form.isLoading ? (
      <CircularProgress 
        sx={{mt: 5, alignSelf: 'center'}} 
        data-testid={`loading ${name} spinner`} />
    ) : form.isError ? (
      <Text data-testid={`get-${name}-error-text`} color="error.main">
        {t(`error: ${name} could not load`)}
      </Text>
    ) : (
      <FormPage />
    )}
  </Column>
  );
};