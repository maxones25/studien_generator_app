import { FormComponentDataAttributes } from '@modules/forms/types';
import { Slider } from '@mui/material';
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form';

export interface FormSliderProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  attributes?: FormComponentDataAttributes
}

export function FormSlider<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  rules,
  attributes
}: FormSliderProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ...field} }) => (
        <Slider 
          aria-label='Temperature'
          value={value ?? 0} 
          onChange={(_e, newValue) => {
            onChange(newValue as PathValue<TFieldValues, Path<TFieldValues>>);
          }}
          {...field} 
          {...attributes}
        />
      )}
    />
  );
};