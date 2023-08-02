import { List } from "@mui/material";
import React from "react";
import { FormEntityFieldListItem } from "..";
import { EnhancedFormEntityField } from "@modules/forms/contexts/FormEditorContext/hooks";
import { FormEntityField } from "@modules/formEntities/types";

export interface FormEntityFieldListProps {
  fields: EnhancedFormEntityField[];
  onSelect: (field: FormEntityField) => void;
}

export const FormEntityFieldList: React.FC<FormEntityFieldListProps> = ({
  fields,
  onSelect,
}) => {
  return (
    <List component="div" disablePadding>
      {fields.map((field, i) => {
        return (
          <FormEntityFieldListItem
            key={i}
            field={field}
            onSelect={onSelect}
          />
        );
      })}
    </List>
  );
};
