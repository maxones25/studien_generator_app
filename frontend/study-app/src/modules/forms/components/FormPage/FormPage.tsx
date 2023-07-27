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
    isLoading,
  } = useFormDataContext();

  return (
    <Form
      data-testid={`${currentPage?.title}-form`}
      onSubmit={form.handleSubmit(handleSubmit)}
      {...formProps}
    >
      <Text>{currentPage?.title}</Text>
      {currentPage?.components.map((value) => 
        <FormComponent 
          key={value?.id}
          formComponent={value}
          form={form}
        />
      )}
      <FormControl margin="normal">
        <Button isLoading={isLoading} testId={`submit-${currentPage?.title}-form`} type="submit">
          {isLastPage ? t("save") : t("next") }
        </Button>
      </FormControl>
    </Form>
  );
};