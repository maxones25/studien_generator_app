import { ExperimentalFormTextField } from "@modules/core/components";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface LabelAttributeProps<
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: FieldName;
  label: string;
  required: boolean;
  placeholder?: string;
}

export const LabelAttribute = <
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  required,
  placeholder,
}: LabelAttributeProps<TFieldValues, FieldName>) => {
  return (
    <ExperimentalFormTextField
      type="text"
      form={form}
      name={name}
      label={label}
      required={required}
      placeholder={placeholder}
    />
  );
};
