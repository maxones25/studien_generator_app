import { FormSelect } from "@modules/core/components";
import { SchedulePeriod } from "@modules/formConfigs/types";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface SchedulePeriodSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
}

export const SchedulePeriodSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
}: SchedulePeriodSelectProps<TFieldValues>) => {
  const { t } = useTranslation();

  return (
    <FormSelect
      control={control}
      name={name}
      label={label}
      options={Object.keys(SchedulePeriod).map((value) => ({
        label: t(value),
        value,
      }))}
    />
  );
};
