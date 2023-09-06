import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { IconButton, Row, Text } from "..";
import { FormControl, OutlinedInput } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export interface TimesPickerProps<TFieldValues extends FieldValues> {
  label?: string;
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export const TimesPicker = <TFieldValues extends FieldValues>({
  label,
  form,
  name,
}: TimesPickerProps<TFieldValues>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { value: times, onChange } }) => (
        <FormControl margin="normal">
          <Row justifyContent="space-between" mb={1}>
            <Text>{label}</Text>
            <IconButton
              testId="add time"
              Icon={<Add />}
              onClick={() => {
                onChange([...times, "00:00"]);
              }}
            />
          </Row>
          {times.map((time: string, i: number) => (
            <Row justifyContent="space-between" mb={1}>
              <OutlinedInput
                type="time"
                size="small"
                defaultValue={time}
                onBlur={(e) => {
                  const time = e.currentTarget.value;
                  if (time) {
                    times[i] = time;
                    onChange([...times]);
                  }
                }}
              />
              <IconButton testId="delete time" Icon={<Remove />} />
            </Row>
          ))}
        </FormControl>
      )}
    />
  );
};
