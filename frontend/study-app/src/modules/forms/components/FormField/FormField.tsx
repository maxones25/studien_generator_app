import { FormTextField } from '@modules/core/components';
import {  FormFieldData } from '@modules/forms/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FormFieldProps {
  formField: FormFieldData;
  form: UseFormReturn
}

export const FormField : React.FC<FormFieldProps>= ({
  formField,
  form,
}) => {
  const { t } = useTranslation();

  const createField = ():JSX.Element => {
    switch (formField.type) {
      case "text":
        return <FormTextField 
          label={formField.name}
          formState={form.formState}
          textFieldProps={form.register(formField.name, {
            required: t("value required", { value: t("name") }),
          })}
        />
      default: 
        return <></>
    }
  }

  return createField();
};