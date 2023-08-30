import { ExperimentalFormTextField, Switch } from "@modules/core/components";
import { FormControl } from "@mui/material";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface DateTimeAttributeProps<
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: FieldName;
  required: boolean;
  label?: string;
}

export const DateTimeAttribute = <
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  required,
}: DateTimeAttributeProps<TFieldValues, FieldName>) => {
  const { t } = useTranslation();

  const isCurrent = form.watch(name) === "CurrentDateTime";

  return (
    <FormControl margin="none">
      {!isCurrent && <ExperimentalFormTextField
        form={form}
        name={name}
        label={label}
        type="datetime-local"
        required={required}
      />}
      <Switch
        label={t("currentDatetime")}
        onChange={(_, checked) => {
          if (checked) {
            console.log(checked, name);
            form.setValue(name, "CurrentDateTime" as any);
          } else {
            form.setValue(name, undefined as any);
          }
        }}
        value={isCurrent}
      />
    </FormControl>
  );
};
