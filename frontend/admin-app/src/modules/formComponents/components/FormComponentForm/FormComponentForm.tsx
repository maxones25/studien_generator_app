import { Button, Form } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormComponentFormData } from "@modules/formComponents/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface FormComponentFormFormProps
  extends FormProps<FormComponentFormData> {}

export const FormComponentForm: React.FC<FormComponentFormFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const form = useForm<FormComponentFormData>({ values });

  console.log(values)

  return (
    <Form form={form} onSubmit={onSubmit} {...formProps}>

      <FormControl margin="normal">
        <Button testId="form component form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
