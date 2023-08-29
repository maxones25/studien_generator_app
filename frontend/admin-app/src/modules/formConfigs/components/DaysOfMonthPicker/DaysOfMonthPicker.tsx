import { Row, Text } from "@modules/core/components";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  get,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DaysOfWeekPickerProps } from "..";
import { Chip, FormControl, FormHelperText } from "@mui/material";
import { ScheduleDaysOfMonth } from "@modules/formConfigs/types";

const days = new Array(28).fill(null).map((_, i) => i + 1);

const transformToMatrix = (arr: number[], rows: number, cols: number) => {
  return Array.from({ length: rows }, (_, rowIndex) => {
    return arr.slice(rowIndex * cols, (rowIndex + 1) * cols);
  });
};

const DAYS_OF_MONTH = transformToMatrix(days, 4, 7);

export interface DaysOfMonthPickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;

  amount?: number;
}

export const DaysOfMonthPicker = <TFieldValues extends FieldValues>({
  control,
  name,
  amount,
}: DaysOfWeekPickerProps<TFieldValues>) => {
  const { t } = useTranslation();

  const validate = (value: ScheduleDaysOfMonth) => {
    const targetAmount = amount!;
    const currentAmount = value?.length ?? 0;
    const diff = targetAmount - currentAmount;
    return (
      diff === 0 || t(diff > 0 ? "select x more" : "select x less", { x: Math.abs(diff) })
    );
  };

  return (
    <>
      <Text variant="body2" sx={{ mb: 1 }}>
        {t("days")}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: amount ? validate : undefined,
        }}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          const daysOfMonth = value as unknown as number[];

          const error = get(errors, name);

          return (
            <FormControl>
              {DAYS_OF_MONTH.map((row) => (
                <Row flexWrap="wrap">
                  {row.map((day) => (
                    <Chip
                      key={day}
                      label={day}
                      color={daysOfMonth?.includes(day) ? "primary" : "default"}
                      sx={{ m: 0.5, width: 40 }}
                      size="small"
                      onClick={() => {
                        if (!daysOfMonth) {
                          onChange([day]);
                        } else if (daysOfMonth.includes(day)) {
                          onChange(daysOfMonth.filter((v) => v !== day));
                        } else {
                          onChange([...daysOfMonth, day]);
                        }
                      }}
                    />
                  ))}
                </Row>
              ))}
              <FormHelperText error={Boolean(error)}>
                {error?.message}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </>
  );
};
