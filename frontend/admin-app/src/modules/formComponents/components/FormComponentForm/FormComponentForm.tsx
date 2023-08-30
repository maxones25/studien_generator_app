import { ComponentAttributes } from "@modules/components/types";
import {
  Button,
  ExperimentalFormTextField,
  Form,
  FormCheckBox,
  FormSelect,
  FormTagsField,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormComponentFormData } from "@modules/formComponents/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  DateAttribute,
  DateTimeAttribute,
  LabelAttribute,
  NumberAttribute,
} from "..";
import { useTranslation } from "react-i18next";

export interface FormComponentFormFormProps
  extends FormProps<FormComponentFormData> {
  componentAttributes: ComponentAttributes;
  fieldName?: string;
}

export const FormComponentForm: React.FC<FormComponentFormFormProps> = ({
  onSubmit,
  values,
  formProps,
  componentAttributes,
  fieldName,
}) => {
  const { t } = useTranslation();
  const form = useForm<FormComponentFormData>({ values });

  const handleSubmit = (data: FormComponentFormData) => {
    if (
      typeof data.attributes.defaultValue !== "boolean" &&
      !Boolean(data.attributes.defaultValue)
    ) {
      delete data.attributes.defaultValue;
    }
    onSubmit(data);
  };

  const options =
    (form.watch("attributes.options") as string[])?.map((value) => ({
      label: value,
      value,
    })) ?? [];

  const hasOptions = options.length > 0;

  return (
    <Form form={form} onSubmit={handleSubmit} {...formProps}>
      {Object.values(componentAttributes).map((attribute) => {
        const label = t(attribute.name);
        return hasOptions && attribute.name === "defaultValue" ? (
          <FormSelect
            control={form.control}
            name={`attributes.${attribute.name}`}
            options={options}
            rules={{
              required: {
                value: attribute.required,
                message: t("required"),
              },
            }}
          />
        ) : attribute.name === "label" ? (
          <LabelAttribute
            form={form}
            label={label}
            name={`attributes.${attribute.name}`}
            required={attribute.required}
            placeholder={fieldName}
          />
        ) : attribute.type === "boolean" ? (
          <FormCheckBox
            control={form.control}
            name={`attributes.${attribute.name}`}
            label={label}
          />
        ) : attribute.type === "options" ? (
          <FormTagsField
            control={form.control}
            name={`attributes.${attribute.name}`}
            label={t("options")}
            rules={{
              required: t("required"),
            }}
          />
        ) : attribute.type === "datetime" ? (
          <DateTimeAttribute
            form={form}
            name={`attributes.${attribute.name}`}
            required={attribute.required}
          />
        ) : attribute.type === "date" ? (
          <DateAttribute
            form={form}
            name={`attributes.${attribute.name}`}
            required={attribute.required}
          />
        ) : attribute.type === "number" ? (
          <NumberAttribute
            form={form}
            label={label}
            name={`attributes.${attribute.name}`}
            required={attribute.required}
          />
        ) : (
          <ExperimentalFormTextField
            form={form}
            label={label}
            name={`attributes.${attribute.name}`}
            required={attribute.required}
          />
        );
      })}
      <FormControl margin="normal">
        <Button testId="form component form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
