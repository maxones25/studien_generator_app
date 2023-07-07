import { Column } from "@modules/core/components";
import React from "react";
import { FormForm } from "..";
import { useGetForm } from "@modules/forms/hooks";

export interface FormTabPanelProps {}

export const FormTabPanel: React.FC<FormTabPanelProps> = () => {
  const getForm = useGetForm();
  console.log(getForm);
  return (
    <Column mt={1}>
      <FormForm onSubmit={console.log} values={getForm.data}/>
    </Column>
  );
};
