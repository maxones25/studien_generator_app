import { FormComponentDataAttributes } from "@modules/forms/types";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  FieldValues,
  Control,
  RegisterOptions,
  Path,
  Controller,
  PathValue,
  get,
} from "react-hook-form";

export interface FormTimePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  formFieldId: string;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes;
}

export function FormTimePicker<TFieldValues extends FieldValues>({
  label,
  control,
  componentId,
  formFieldId,
  rules,
  attributes,
}: FormTimePickerProps<TFieldValues>) {
  const name: Path<TFieldValues> =
    `${componentId}.${formFieldId}` as Path<TFieldValues>;
  const defaultValue =
    attributes?.defaultValue === "CurrentTime"
      ? dayjs()
      : dayjs(attributes?.defaultValue);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue as PathValue<TFieldValues, Path<TFieldValues>>}
      render={({ field: { onChange, value, ...field }, formState }) => {
        const error = get(formState.errors, name);

        return (
          <MobileTimePicker
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                error: Boolean(error),
                helperText: error?.message?.toString() ?? null,
              },
            }}
            value={value}
            label={label}
            onChange={(value: Dayjs | null) => {
              onChange(value as PathValue<TFieldValues, Path<TFieldValues>>);
            }}
            {...field}
            {...attributes}
          />
        );
      }}
    />
  );
}
