import { FormSwitch } from "@modules/core/components";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export interface DaysOfWeekPickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export const DaysOfWeekPicker = <TFieldValues extends FieldValues>({
  control,
  name,
}: DaysOfWeekPickerProps<TFieldValues>) => {
  const { t } = useTranslation();
  return (
    <>
      {daysOfWeek.map((day, i) => (
        <FormSwitch
          key={i}
          control={control}
          label={t(day)}
          // @ts-ignore
          name={`${name}.${i}`}
        />
      ))}
    </>
  );
};
