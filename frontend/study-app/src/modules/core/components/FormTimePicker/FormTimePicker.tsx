import { FormComponentDataAttributes } from '@modules/forms/types';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldValues, Control, RegisterOptions, Path, Controller, PathValue } from 'react-hook-form';

export interface FormTimePickerProps <TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes;
}

export function FormTimePicker<TFieldValues extends FieldValues> ({
  label,
  control,
  name,
  rules,
  attributes,
}: FormTimePickerProps<TFieldValues>) {

  return (
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, ...field}, formState }) => (
      <MobileTimePicker 
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