import { FormSelect, FormSlider, FormSwitch, FormTextField, FormTimePicker } from '@modules/core/components';
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
      case "Text":
        return <FormTextField 
          label={formComponent.label}
          formState={form.formState}
          textFieldProps={form.register(formComponent.id, {
            required: t("value required"),
          })}
        />
      case "Enum":
        return <FormSelect 
          label={formComponent.label}
          control={form.control}
          name={formComponent.id}
          rules={{required: true}}
          options={
            formComponent?.attributes?.options ?? []}
        />
      case "Boolean":
        return <FormSwitch 
          label={formComponent.label}
          control={form.control}
          name={formComponent.id}
          rules={{required: true}}
        />
      case "Number":
        return <FormSlider 
          label={formComponent.label}
          control={form.control}
          name={formComponent.id}
          rules={{required: true}}
          attributes={formComponent.attributes}
        />
      case "Date":
        return <FormTimePicker 
          label={formComponent.label}
          control={form.control}
          name={formComponent.id}
          rules={{required: t("value required")}}
          attributes={formComponent.attributes}
        />
      default: 
        return <></>
    }
  }

  return createField();
};