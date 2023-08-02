import { FormEntityField } from "@modules/formEntities/types";
import { EnhancedFormEntityField } from "@modules/forms/contexts/FormEditorContext/hooks";
import { ListItemButton, ListItemText, Theme } from "@mui/material";
import React from "react";

export interface FormEntityFieldListItemProps {
  field: EnhancedFormEntityField;
  onSelect: (field: FormEntityField) => void;
}

export const FormEntityFieldListItem: React.FC<
  FormEntityFieldListItemProps
> = ({ field, onSelect }) => {
  const selectedStyle = field.isSelected
    ? {
        outlineWidth: 2,
        outlineStyle: "solid",
        outlineColor: (theme: Theme) => theme.palette.primary.main,
      }
    : {};

  return (
    <ListItemButton
      sx={{
        pl: 4,
        borderRadius: 4,
        boxShadow: 4,
        mb: 1,
        ...selectedStyle,
      }}
      onClick={() => onSelect(field.data)}
    >
      <ListItemText primary={field.data.name} secondary={field.data.type} />
    </ListItemButton>
  );
};
