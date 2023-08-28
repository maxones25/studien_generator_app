import { Component } from "@modules/components/types";
import { Button, Form } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormComponentFormData } from "@modules/formComponents/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormComponentAttributeField } from "..";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";

export interface FormComponentFormFormProps
  extends FormProps<FormComponentFormData> {
  component: Component;
  fields: {
    entity: FormEntity;
    data: FormEntityField;
  }[];
}

export const FormComponentForm: React.FC<FormComponentFormFormProps> = ({
  onSubmit,
  values,
  formProps,
  component,
  fields,
}) => {
  const form = useForm<FormComponentFormData>({ values });

  const handleSubmit = (data: FormComponentFormData) => {
    if (
      typeof data.attributes.defaultValue !== "boolean" &&
      !Boolean(data.attributes.defaultValue)
    ) {
      delete data.attributes.defaultValue;
    }
    onSubmit(data);
  };

  return (
    <Form form={form} onSubmit={handleSubmit} {...formProps}>
      {Object.values(component.attributes).map((attribute) => {
        return (
          <FormComponentAttributeField
            form={form}
            type={component.name}
            name={`attributes.${attribute.name}`}
            fields={fields.map(({ data }) => data)}
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
