import { FormEntityField } from "@modules/formEntities/types";
import { EnhancedFormEntityField } from "@modules/forms/contexts/FormEditorContext/hooks";
import { Check } from "@mui/icons-material";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Theme,
} from "@mui/material";
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

  const isUsedInForm = field.data.component !== null;

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
      disabled={isUsedInForm}
    >
      {isUsedInForm && (
        <ListItemAvatar>
          <Avatar>
            <Check />
          </Avatar>
        </ListItemAvatar>
      )}
      <ListItemText primary={field.data.name} secondary={field.data.type} />
    </ListItemButton>
  );
};
