import { Button, Form, Text } from '@modules/core/components';
import React from 'react';
import { FormComponent } from '..';
import { FormProps as FormComponentProps } from '@modules/core/components';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormControl } from '@mui/material';
import { useFormDataContext } from '@modules/forms/contexts';

export interface FormPageProps{
  formProps?: FormComponentProps;
}

export const FormPage : React.FC<FormPageProps> = ({
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm();
  const { 
    isLastPage,
    handleSubmit, 
    currentPage,
  } = useFormDataContext();

  return (
    <Form
      data-testid={`${currentPage?.name}-form`}
      onSubmit={form.handleSubmit(handleSubmit)}
      {...formProps}
    >
      <Text>{currentPage?.name}</Text>
      {currentPage?.fields.map((value) => 
        <FormComponent 
          key={value?.name}
          formField={value}
          form={form}
        />
      )}
      <FormControl margin="normal">
        <Button testId={`submit-${currentPage?.name}-form`} type="submit">
          { isLastPage ? t("save") : t("next") }
        </Button>
      </FormControl>
    </Form>
  );
};