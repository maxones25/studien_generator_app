import { Switch } from "@modules/core/components";
import { ScheduleDaysOfWeek } from "@modules/formConfigs/types";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  get,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

const DAYS_OF_WEEK = [
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

  amount?: number;
}

export const DaysOfWeekPicker = <TFieldValues extends FieldValues>({
  control,
  name,
  amount,
}: DaysOfWeekPickerProps<TFieldValues>) => {
  const { t } = useTranslation();

  const validate = (value: ScheduleDaysOfWeek) => {
    return (
      (value?.filter((v) => Boolean(v))?.length ?? 0) === 3 ||
      t("please select x", { x: amount })
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: amount ? validate : undefined,
      }}
      // @ts-ignore
      defaultValue={
        [false, false, false, false, false, false, false] as ScheduleDaysOfWeek
      }
      render={({ field: { value, onChange }, formState: { errors } }) => {
        const daysOfWeek = value as ScheduleDaysOfWeek;

        const error = get(errors, name);

        return (
          <FormControl margin="normal">
            <FormLabel sx={{ mb: 1 }}>{t("week")}</FormLabel>
            {DAYS_OF_WEEK.map((day, i) => (
              <Switch
                key={i}
                label={t(day)}
                onChange={(_, checked) => {
                  daysOfWeek[i] = checked;
                  onChange([...daysOfWeek]);
                }}
                value={Boolean(daysOfWeek[i])}
              />
            ))}
            <FormHelperText error={Boolean(error)}>
              {error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
