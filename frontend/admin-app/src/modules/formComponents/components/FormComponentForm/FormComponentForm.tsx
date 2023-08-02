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

  console.log(values);

  return (
    <Form form={form} onSubmit={onSubmit} {...formProps}>
      {component.attributes.map((attribute, i) => {
        return (
          <FormComponentAttributeField
            form={form}
            keyName={attribute.name}
            name={`attributes.${i}.value`}
            required={attribute.required}
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
