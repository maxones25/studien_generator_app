import {
  FormCheckBox,
  FormDatePicker,
  FormDateTimePicker,
  FormNumberPicker,
  FormRadioGroup,
  FormSelect,
  FormSlider,
  FormSwitch,
  FormTextField,
  FormTimePicker,
  Text,
} from "@modules/core/components";
import { FormComponentData } from "@modules/forms/types";
import { Hiit } from "@modules/hiit/components";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormComponentProps {
  formComponent: FormComponentData;
  form: UseFormReturn;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  formComponent,
  form,
}) => {
  const { t } = useTranslation();
  const attributes: { [x: string]: any } = formComponent.attributes.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    {}
  );

  const formField = formComponent.formFields[0];

  const name = `${formComponent.id}.${formField?.id}`;

  const props = {
    label: attributes.label,
    control: form.control,
    componentId: formComponent.id,
    formFieldId: formField?.id,
    rules: {
      required: !attributes.required ? false : t("required"),
      minLength: {
        value: attributes.minLength,
        message: t("min length", { value: attributes.minLength }),
      },
      maxLength: {
        value: attributes.maxLength,
        message: t("max length", { value: attributes.maxLength }),
      },
      min: {
        value: attributes.min,
        message: t("min", { value: attributes.min }),
      },
      max: {
        value: attributes.max,
        message: t("max", { value: attributes.max }),
      },
    },
    attributes: attributes,
  };

  const createField = (): JSX.Element => {
    switch (formComponent.type) {
      case "TextField":
        return (
          <FormTextField
            control={form.control}
            label={props.label}
            attributes={props.attributes}
            formState={form.formState}
            textFieldProps={form.register(name, props.rules)}
          />
        );
      case "NumberPicker":
        return (
          <FormNumberPicker
            control={form.control}
            label={props.label}
            attributes={props.attributes}
            type={"number"}
            formState={form.formState}
            textFieldProps={form.register(name, {
              ...props.rules,
              valueAsNumber: true,
            })}
          />
        );
      case "Select":
        return <FormSelect {...props} />;
      case "RadioGroup":
        return <FormRadioGroup {...props} />;
      case "Switch":
        return <FormSwitch {...props} />;
      case "Slider":
        return <FormSlider {...props} />;
      case "TimePicker":
        return <FormTimePicker {...props} />;
      case "DatePicker":
        return <FormDatePicker {...props} />;
      case "DateTimePicker":
        return <FormDateTimePicker {...props} />;
      case "CheckBox":
        return <FormCheckBox {...props} />;
      case "Text":
        return <Text>{attributes.text}</Text>;
      case "HIIT":
        return (
          <Hiit
            label={props.label}
            control={form.control}
            componentId={formComponent.id}
            formFields={formComponent.formFields}
            attributes={attributes}
          />
        );
      default:
        return <></>;
    }
  };

  return createField();
};
