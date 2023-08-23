import React from "react";
import { Column, Editable, IconButton } from "@modules/core/components";
import { ListItem, ListItemText } from "@mui/material";
import { FormEntityFieldList } from "..";
import { EnhancedFormEntity } from "@modules/forms/contexts/FormEditorContext/hooks";
import { useFormEditor } from "@modules/forms/hooks";
import {
  useRemoveEntity,
  useChangeEntityName,
} from "@modules/formEntities/hooks";
import { Delete } from "@mui/icons-material";

export interface FormEntityListItemProps {
  formEntity: EnhancedFormEntity;
}

export const FormEntityListItem: React.FC<FormEntityListItemProps> = ({
  formEntity,
}) => {
  const formEditor = useFormEditor();
  const updateFormEntity = useChangeEntityName();
  const deleteFormEntity = useRemoveEntity();

  const handleDeleteFormEntity = () => {
    deleteFormEntity.mutate(formEntity.data);
  };

  return (
    <Column>
      <ListItem sx={{ justifyContent: "space-between" }}>
        <ListItemText
          primary={
            <Editable
              onSubmit={(name) =>
                updateFormEntity.mutate({ id: formEntity.data.id, name })
              }
              defaultText={formEntity.data.name}
              isLoading={updateFormEntity.isLoading}
            >
              {formEntity.data.name}
            </Editable>
          }
          secondary={formEntity.data.entity.name}
        />
        <IconButton
          testId="delete form entity icon button"
          Icon={<Delete />}
          onClick={handleDeleteFormEntity}
        />
      </ListItem>
      <FormEntityFieldList
        fields={formEntity.fields.items}
        onSelect={(entityField) =>
          formEditor.selected.fields.toggle(formEntity.data, entityField)
        }
      />
    </Column>
  );
};
