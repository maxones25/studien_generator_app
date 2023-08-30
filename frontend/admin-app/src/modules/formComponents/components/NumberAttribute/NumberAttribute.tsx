import { ExperimentalFormTextField } from "@modules/core/components";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface NumberAttributeProps<
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: FieldName;
  label: string;
  required: boolean;
}

export const NumberAttribute = <
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
>({
  form,
  label,
  name,
  required,
}: NumberAttributeProps<TFieldValues, FieldName>) => {
  return (
    <ExperimentalFormTextField
      type="number"
      form={form}
      label={label}
      name={name}
      required={required}
    />
  );
};
