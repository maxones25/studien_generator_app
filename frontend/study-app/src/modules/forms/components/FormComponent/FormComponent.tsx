import { FormTextField } from '@modules/core/components';
import { FormComponentData } from '@modules/forms/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FormComponentProps {
  formComponent: FormComponentData;
  form: UseFormReturn
}

export const FormComponent : React.FC<FormComponentProps>= ({
  formComponent,
  form,
}) => {
  const { t } = useTranslation();

  const createField = ():JSX.Element => {
    switch (formComponent.type) {
      case "text":
        return <FormTextField 
          label={formComponent.label}
          formState={form.formState}
          textFieldProps={form.register(formComponent.id, {
            required: t("value required", { value: t("name") }),
          })}
        />
      default: 
        return <></>
    }
  }

  return createField();
};