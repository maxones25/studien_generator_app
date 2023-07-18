import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { EntityFormData } from "@modules/entities/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface DeleteEntityFormProps
  extends FormProps<EntityFormData, { name: string }> {}

export const DeleteEntityForm: React.FC<DeleteEntityFormProps> = ({
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
          testId="delete entity form submit button"
          color="error"
          type="submit"
        >
          Delete
        </Button>
      </FormControl>
    </Form>
  );
};
