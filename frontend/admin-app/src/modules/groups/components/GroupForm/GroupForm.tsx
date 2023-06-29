import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { GroupFormData } from "@modules/groups/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface GroupFormProps extends FormProps<GroupFormData> {}

export const GroupForm: React.FC<GroupFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const form = useForm<GroupFormData>({ values });

  return (
    <Form {...formProps} onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl>
        <FormTextField
          formState={form.formState}
          textFieldProps={form.register("name", {
            required: "required",
          })}
        />
        <Button testId="group form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
