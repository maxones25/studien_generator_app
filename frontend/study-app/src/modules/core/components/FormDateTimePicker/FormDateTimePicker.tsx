import { FormComponentDataAttributes } from '@modules/forms/types';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldValues, Control, RegisterOptions, Path, Controller, PathValue, get } from 'react-hook-form';

export interface FormDateTimePickerProps <TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  entityFieldId: string;
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
  componentId,
  entityFieldId,
  rules,
  attributes,
}: FormDateTimePickerProps<TFieldValues>) {
  const name: Path<TFieldValues> = `${componentId}.${entityFieldId}` as Path<TFieldValues>


  return (
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, ...field}, formState }) => {
      const error = get(formState.errors, name);
      return(
      <MobileDateTimePicker 
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            error: Boolean(error),
            helperText: error?.message?.toString() ?? null,
          }
        }}
        label={label}
        onChange={(value: Dayjs | null) => {
          onChange(value?.toDate() as PathValue<TFieldValues, Path<TFieldValues>>);
        }}
        {...field} 
        {...attributes}
      />
      )}}
    />
  );
};