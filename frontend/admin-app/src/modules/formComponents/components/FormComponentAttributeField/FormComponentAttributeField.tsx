import {
  ExperimentalFormTextField,
  FormSelect,
} from "@modules/core/components";
import { FormEntityField } from "@modules/formEntities/types";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormComponentAttributeFieldProps<
  FormData extends FieldValues
> {
  form: UseFormReturn<FormData>;
  type: string;
  name: FieldPath<FormData>;

  fields: FormEntityField[];
  attribute: { name: string; required: boolean; type: string };
}

const convertType = (type: string): string => {
  switch (type) {
    case "datetime":
      return "datetime-local";
    case "string":
      return "text";
    case "boolean":
      return "checkbox";
    default:
      return type;
  }
};

export const FormComponentAttributeField = <FormData extends FieldValues>({
  name,
  type,
  attribute,
  fields,
  form,
  ...props
}: FormComponentAttributeFieldProps<FormData>) => {
  const { t } = useTranslation();

  const label = t(attribute.name);

  if (attribute.type === "boolean") {
    return (
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} />} label={label} />
        )}
      />
    );
  }

  if (type === "Select" && attribute.name === "defaultValue") {
    const options = (fields[0].attributes.values as string[]).map((value) => ({
      label: value,
      value,
    }));
    return <FormSelect control={form.control} name={name} options={options} />;
  }

  const defaultLabel =
    attribute.name === "label"
      ? fields.find((field) => field.name)?.name
      : undefined;

  return (
    <ExperimentalFormTextField
      {...props}
      form={form}
      name={name}
      label={label}
      type={convertType(attribute.type)}
      required={attribute.required}
      placeholder={defaultLabel}
    />
  );
};
