import React from "react";
import { FormEntityListItem } from "..";
import { List } from "@mui/material";
import { useFormEditorContext } from "@modules/forms/contexts";

export interface FormEntityListProps {}

export const FormEntityList: React.FC<FormEntityListProps> = () => {
  const { formEntities } = useFormEditorContext();
  return (
    <List>
      {formEntities.map((formEntity) => (
        <FormEntityListItem key={formEntity.data.id} formEntity={formEntity} />
      ))}
    </List>
  );
};
