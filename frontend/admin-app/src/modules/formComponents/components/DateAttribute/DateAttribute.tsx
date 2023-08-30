import { ExperimentalFormTextField, Switch } from "@modules/core/components";
import { FormControl } from "@mui/material";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface DateAttributeProps<
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: FieldName;
  required: boolean;
  label?: string;
}

export const DateAttribute = <
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
>({
  form,
  label,
  name,
  required,
}: DateAttributeProps<TFieldValues, FieldName>) => {
  const { t } = useTranslation();

  const isCurrent = form.watch(name) === "CurrentDate";

  return (
    <FormControl margin="none">
      {!isCurrent && (
        <ExperimentalFormTextField
          form={form}
          name={name}
          label={label}
          type="date"
          required={required}
        />
      )}
      <Switch
        label={t("currentDate")}
        onChange={(_, checked) => {
          if (checked) {
            form.setValue(name, "CurrentDate" as any);
          } else {
            form.setValue(name, undefined as any);
          }
        }}
        value={isCurrent}
      />
    </FormControl>
  );
};
