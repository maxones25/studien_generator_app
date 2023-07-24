import { FormCheckBox, FormDatePicker, FormDateTimePicker, FormSelect, FormSlider, FormSwitch, FormTextField, FormTimePicker } from '@modules/core/components';
import { FormComponentData, FormComponentDataAttributes } from '@modules/forms/types';
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
  const attributes: FormComponentDataAttributes = formComponent.attributes.reduce((obj, item) => 
    Object.assign(obj, { [item.key]: item.value }), {}
  );
  const label = attributes?.label
  const props = {
    label: label,
    control: form.control,
    componentId: formComponent.id,
    entityFieldId: formComponent.formFields[0].entityFieldId,
    rules: {required: t("value required")},
    attributes: attributes
  }

  const createField = ():JSX.Element => {
    switch (formComponent.type) {
      case "TextField":
        return <FormTextField 
          label={label}
          formState={form.formState}
          textFieldProps={form.register(`${formComponent.id}.${formComponent.formFields[0].entityFieldId}`, {
            required: t("value required"),
          })}
        />
      case "Select":
        return <FormSelect {...props} />
      case "Switch":
        return <FormSwitch {...props} />
      case "Slider":
        return <FormSlider {...props} />
      case "TimePicker":
        return <FormTimePicker {...props} />
      case "DatePicker":
        return <FormDatePicker {...props} />
      case "DateTimePicker":
        return <FormDateTimePicker {...props} />
      case "CheckBox":
        return <FormCheckBox {...props} />
      default: 
        return <></>
    }
  }

  return createField();
};