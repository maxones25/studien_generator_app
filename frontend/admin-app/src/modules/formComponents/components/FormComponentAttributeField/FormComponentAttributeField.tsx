import { ExperimentalFormTextField } from "@modules/core/components";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

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

export interface FormComponentAttributeFieldProps<
  FormData extends FieldValues
> {
  form: UseFormReturn<FormData>;
  type: string;
  name: FieldPath<FormData>;
  placeholder?: string;
  attribute: { name: string; required: boolean; type: string };
}

export const FormComponentAttributeField = <FormData extends FieldValues>({
  name,
  attribute,
  form,
  ...props
}: FormComponentAttributeFieldProps<FormData>) => {
  const { t } = useTranslation();

  const label = t(attribute.name);

  return (
    <ExperimentalFormTextField
      {...props}
      form={form}
      name={name}
      label={label}
      type={convertType(attribute.type)}
      required={attribute.required}
    />
  );
};
