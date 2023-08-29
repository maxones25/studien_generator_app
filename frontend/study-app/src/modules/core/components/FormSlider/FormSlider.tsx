import { FormComponentDataAttributes } from '@modules/forms/types';
import { FormControl, FormControlLabel, FormHelperText, Slider } from '@mui/material';
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FormSliderProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  componentId: string;
  entityFieldId: string;
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
  componentId,
  entityFieldId,
  rules,
  attributes
}: FormSliderProps<TFieldValues>) {
  const { t } = useTranslation();
  const name: Path<TFieldValues> = `${componentId}.${entityFieldId}` as Path<TFieldValues>;
  const min = attributes?.min ?? 0;
  const max =  attributes?.max ?? 100;
  const marks = [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={attributes?.defaultValue}
      render={({ field: { onChange, value, ...field}, formState }) => {
        const error = get(formState.errors, name);

        return(
        <FormControl 
          margin="normal"
          error={Boolean(error)}
          >
          <FormControlLabel
          control={
            <Slider 
              onChange={(_e, newValue) => {
                onChange(newValue as PathValue<TFieldValues, Path<TFieldValues>>);
              }}
              valueLabelDisplay="on"
              value={value ?? min}
              marks={marks}
              {...field} 
              {...attributes}
            />
          }
          label={label}
          labelPlacement='top'
          />
          {Boolean(error) && 
          <FormHelperText>{t("value required")}</FormHelperText>}
      </FormControl>
      )}}
    />
  );
};