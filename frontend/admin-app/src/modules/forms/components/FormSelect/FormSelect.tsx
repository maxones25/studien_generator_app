import { Select, SelectProps } from "@modules/core/components";
import { useGetForms } from "@modules/forms/hooks";
import React from "react";

export interface FormSelectProps extends Omit<SelectProps, "name" | "options"> {
  name?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name = "form-select",
  ...props
}) => {
  const getForms = useGetForms();

  const options =
    getForms.data?.map((form) => ({
      label: form.name,
      value: form.id,
    })) ?? [];

  return (
    <Select
      name={name}
      options={[{ label: "-", value: null }, ...options]}
      {...props}
    />
  );
};
