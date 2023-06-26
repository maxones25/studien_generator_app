import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { StudyFormData } from "@modules/studies/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface StudyFormProps extends FormProps<StudyFormData> {}

export const StudyForm: React.FC<StudyFormProps> = ({
  onSubmit,
  formProps,
  values,
}) => {
  const form = useForm<StudyFormData>({ values });

  return (
    <Form
      data-testid="study form"
      onSubmit={form.handleSubmit(onSubmit)}
      {...formProps}
    >
      <FormTextField
        label="Name"
        formState={form.formState}
        textFieldProps={form.register("name", { required: "Name required" })}
      />
      <FormControl margin="normal">
        <Button testId="submit-study-form" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
