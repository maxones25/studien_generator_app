import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FieldFormData } from "@modules/fields/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface DeleteFieldFormProps
  extends FormProps<FieldFormData, { name: string }> {}

export const DeleteFieldForm: React.FC<DeleteFieldFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const form = useForm<{ name: string }>();

  return (
    <Form form={form} onSubmit={() => onSubmit(values!)} {...formProps}>
      <FormTextField
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: "required",
          validate: {
            unequal: (value) => value === values?.name || "unequal",
          },
        })}
      />
      <FormControl margin="normal">
        <Button
          testId="delete field form submit button"
          color="error"
          type="submit"
        >
          Delete
        </Button>
      </FormControl>
    </Form>
  );
};
