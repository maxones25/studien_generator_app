import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { EntityFormData } from "@modules/entities/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface EntityFormFormProps extends FormProps<EntityFormData> {}

export const EntityForm: React.FC<EntityFormFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const form = useForm<EntityFormData>({ values });

  return (
    <Form {...formProps} onSubmit={form.handleSubmit(onSubmit)}>
      <FormTextField
        formState={form.formState}
        textFieldProps={form.register("name", { required: "required" })}
      />
      <FormControl margin="normal">
        <Button testId="entity form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
