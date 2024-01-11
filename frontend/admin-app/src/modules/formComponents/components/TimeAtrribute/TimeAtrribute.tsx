import { ExperimentalFormTextField, Switch } from "@modules/core/components";
import { FormControl } from "@mui/material";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface TimeAttributeProps<
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: FieldName;
  required: boolean;
  label?: string;
}

export const TimeAttribute = <
  TFieldValues extends FieldValues,
  FieldName extends FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  required,
}: TimeAttributeProps<TFieldValues, FieldName>) => {
  const { t } = useTranslation();

  const isCurrent = form.watch(name) === "CurrentTime";

  return (
    <FormControl margin="none">
      {!isCurrent && <ExperimentalFormTextField
        form={form}
        name={name}
        label={label}
        type="time"
        required={required}
      />}
      <Switch
        label={t("currentTime")}
        onChange={(_, checked) => {
          if (checked) {
            form.setValue(name, "CurrentTime" as any);
          } else {
            form.setValue(name, undefined as any);
          }
        }}
        value={isCurrent}
      />
    </FormControl>
  );
};
