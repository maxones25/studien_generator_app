import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { GroupFormData } from "@modules/groups/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface DeleteGroupFormProps extends FormProps<GroupFormData> {}

export const DeleteGroupForm: React.FC<DeleteGroupFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const form = useForm<{ name: string }>();

  return (
    <Form {...formProps} form={form} onSubmit={() => onSubmit(values!)}>
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
        <Button testId="delete group form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
