import { FormComponentDataAttributes } from '@modules/forms/types';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldValues, Control, RegisterOptions, Path, Controller, PathValue } from 'react-hook-form';

export interface FormDateTimePickerProps <TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes;
}

export function FormDateTimePicker<TFieldValues extends FieldValues> ({
  label,
  control,
  name,
  rules,
  attributes,
}: FormDateTimePickerProps<TFieldValues>) {

  return (
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, ...field}, formState }) => (
      <MobileDateTimePicker 
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