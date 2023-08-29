import {
  ExperimentalFormTextField,
  FormSelect,
  Switch,
} from "@modules/core/components";
import { FormEntityField } from "@modules/formEntities/types";
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
  get,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormComponentAttributeFieldProps<
  FormData extends FieldValues
> {
  form: UseFormReturn<FormData>;
  type: string;
  name: FieldPath<FormData>;

  fields: FormEntityField[];
  attribute: { name: string; required: boolean; type: string };
}

const convertType = (type: string): string => {
  switch (type) {
    case "datetime":
      return "datetime-local";
    case "string":
      return "text";
    case "boolean":
      return "checkbox";
    default:
      return type;
  }
};

export const FormComponentAttributeField = <FormData extends FieldValues>({
  name,
  type,
  attribute,
  fields,
  form,
  ...props
}: FormComponentAttributeFieldProps<FormData>) => {
  const { t } = useTranslation();

  const label = t(attribute.name);

  if (attribute.type === "boolean") {
    return (
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} />} label={label} />
        )}
      />
    );
  }

  if (
    (type === "Select" || type === "RadioGroup") &&
    attribute.name === "defaultValue"
  ) {
    const options =
      form
        // @ts-ignore
        .watch("attributes.options")
        ?.map((value) => ({ label: value, value })) ?? [];
    return <FormSelect control={form.control} name={name} options={options} />;
  }

  if (attribute.name === "options") {
    return (
      <Controller
        control={form.control}
        rules={{
          required: "required",
        }}
        name={name}
        render={({ field: { onChange, ...field }, formState: { errors } }) => {
          const error = get(errors, name);

          return (
            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              onChange={(_, values) => {
                onChange(values);
              }}
              freeSolo
              value={field.value}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    {...field}
                    label="Enum (Werte)"
                    multiline
                    margin="normal"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }

  const defaultLabel =
    attribute.name === "label"
      ? fields.find((field) => field.name)?.name
      : undefined;

  return (
    <FormControl margin="none">
      <ExperimentalFormTextField
        {...props}
        form={form}
        name={name}
        label={label}
        type={convertType(attribute.type)}
        required={attribute.required}
        placeholder={defaultLabel}
      />
      {attribute.type === "datetime" && (
        <Switch
          label={t("currentDate")}
          onChange={(_, checked) => {
            if (checked) {
              console.log(checked, name);
              form.setValue(name, "CurrentDateTime" as any);
            } else {
              form.setValue(name, undefined as any);
            }
          }}
          value={form.watch(name) === "CurrentDateTime"}
        />
      )}
    </FormControl>
  );
};
