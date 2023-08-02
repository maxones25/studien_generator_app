import { Component } from "@modules/components/types";
import { Button, Form } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormComponentFormData } from "@modules/formComponents/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormComponentAttributeField } from "..";

export interface FormComponentFormFormProps
  extends FormProps<FormComponentFormData> {
  component: Component;
}

export const FormComponentForm: React.FC<FormComponentFormFormProps> = ({
  onSubmit,
  values,
  formProps,
  component,
}) => {
  const form = useForm<FormComponentFormData>({ values });

  const handleSubmit = (data: FormComponentFormData) => {
    onSubmit(data)
  }

  return (
    <Form form={form} onSubmit={handleSubmit} {...formProps}>
      {Object.values(component.attributes).map((attribute) => {
        return (
          <FormComponentAttributeField
            form={form}
            name={`attributes.${attribute.name}`}
            attribute={attribute}
          />
        );
      })}
      <FormControl margin="normal">
        <Button testId="form component form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
