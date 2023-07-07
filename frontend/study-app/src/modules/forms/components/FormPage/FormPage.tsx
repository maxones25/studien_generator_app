import { Button, Form } from '@modules/core/components';
import React from 'react';
import { FormField } from '..';
import { FormProps as FormComponentProps } from '@modules/core/components';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormData } from '@modules/forms/types';
import { FormControl } from '@mui/material';
import { useMultiFormContext } from '@modules/forms/contexts';

export interface FormPageProps{
  onSubmit: (data: object) => void;
  formProps?: FormComponentProps;
  formData?: FormData;
}

export const FormPage : React.FC<FormPageProps> = ({
  onSubmit,
  formProps,
  formData,
}) => {
  const { t } = useTranslation();
  const form = useForm();
  const { isLastPage } = useMultiFormContext();

  return (
    <Form
      data-testid={`${formData?.name}-form`}
      onSubmit={form.handleSubmit(onSubmit)}
      {...formProps}
    >
      {formData?.fields.map((value) => 
        <FormField 
          formField={value}
          form={form}
        />
      )}
      <FormControl margin="normal">
        <Button testId={`submit-${formData?.name}-form`} type="submit">
          { isLastPage ? t("save") : t("next") }
        </Button>
      </FormControl>
    </Form>
  );
};