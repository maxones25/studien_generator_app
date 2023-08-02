import {
  Form,
  FormSelect,
  FormTextField,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FieldFormData } from "@modules/fields/types";
import { Save } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export interface FieldFormProps extends FormProps<FieldFormData> {}

export const FieldForm: React.FC<FieldFormProps> = ({
  onSubmit,
  values,
  formProps,
  isNew,
}) => {
  const form = useForm<FieldFormData>({ values });

  return (
    <Form form={form} {...formProps} onSubmit={onSubmit}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Text variant="h6">{isNew ? "New Field" : "Update Field"}</Text>
        <IconButton data-testid="field form submit button" type="submit">
          <Save />
        </IconButton>
      </Toolbar>
      <FormTextField
        label="Name"
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: "required",
        })}
      />
      <FormSelect
        label="Type"
        control={form.control}
        name="type"
        rules={{ required: "required" }}
        options={[
          { label: "Text", value: "Text" },
          { label: "Nummer", value: "Number" },
          { label: "Datum und Uhrzeit", value: "DateTime" },
          { label: "Datum", value: "Date" },
          { label: "Uhrzeit", value: "Time" },
          { label: "Wahrheitswert", value: "Boolean" },
          { label: "Enumeration", value: "Enum" },
        ]}
      />
      {form.watch("type") === "Enum" && (
        <Controller
          control={form.control}
          rules={{
            required: "required",
          }}
          name="data.enum"
          render={({ field: { onChange, ...field } }) => (
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
                    error={Boolean(form.formState.errors.data?.enum)}
                    helperText={form.formState.errors.data?.enum?.message}
                  />
                );
              }}
            />
          )}
        />
      )}
    </Form>
  );
};
