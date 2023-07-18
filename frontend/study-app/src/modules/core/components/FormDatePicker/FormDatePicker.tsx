import { FormComponentDataAttributes } from '@modules/forms/types';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldValues, Control, RegisterOptions, Path, Controller, PathValue } from 'react-hook-form';

export interface FormDatePickerProps <TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes;
}

export function FormDatePicker<TFieldValues extends FieldValues> ({
  label,
  control,
  name,
  rules,
  attributes,
}: FormDatePickerProps<TFieldValues>) {

  return (
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, ...field}, formState }) => (
      <MobileDatePicker 
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: Boolean(formState.errors[name]),
            helperText: formState.errors[name]?.message?.toString() ?? null,
          }
        }}
        label={label}
        onChange={(value: Dayjs | null) => {
          onChange(value?.toDate() as PathValue<TFieldValues, Path<TFieldValues>>);
        }}
        {...field} 
        {...attributes}
      />
      )}
    />
  );
};