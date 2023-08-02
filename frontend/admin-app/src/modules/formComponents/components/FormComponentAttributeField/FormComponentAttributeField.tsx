import { ExperimentalFormTextField } from "@modules/core/components";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormComponentAttributeFieldProps<
  FormData extends FieldValues
> {
  form: UseFormReturn<FormData>;
  name: FieldPath<FormData>;
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
  attribute,
  ...props
}: FormComponentAttributeFieldProps<FormData>) => {
  const { t } = useTranslation();
  return (
    <ExperimentalFormTextField
      {...props}
      name={name}
      label={t(attribute.name)}
      type={convertType(attribute.type)}
      required={attribute.required}
    />
  );
};
