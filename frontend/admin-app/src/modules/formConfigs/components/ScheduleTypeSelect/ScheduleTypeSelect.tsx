import { FormSelect } from "@modules/core/components";
import { ScheduleType } from "@modules/formConfigs/types";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface ScheduleTypeSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
}
export const ScheduleTypeSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
}: ScheduleTypeSelectProps<TFieldValues>) => {
  const { t } = useTranslation();
  return (
    <FormSelect
      control={control}
      name={name}
      label={label}
      options={Object.keys(ScheduleType).map((value) => ({
        label: t(value),
        value,
      }))}
    />
  );
};
