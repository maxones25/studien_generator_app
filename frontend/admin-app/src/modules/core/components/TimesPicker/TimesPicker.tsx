import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { Column, IconButton, Row, Text } from "..";
import { OutlinedInput } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export interface TimesPickerProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export const TimesPicker = <TFieldValues extends FieldValues>({
  form,
  name,
}: TimesPickerProps<TFieldValues>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { value: times, onChange } }) => (
        <Column>
          <Row justifyContent="space-between">
            <Text>Times</Text>
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
        </Column>
      )}
    />
  );
};
