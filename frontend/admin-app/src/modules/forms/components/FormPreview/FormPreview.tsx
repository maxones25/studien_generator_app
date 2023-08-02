import { Column, Row, Text } from "@modules/core/components";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";

export interface FormPreviewProps {}

export const FormPreview: React.FC<FormPreviewProps> = () => {
  const formEditor = useFormEditor();
  const { components, formComponents } = useFormEditorContext();

  return (
    <Column height="100%" boxShadow={4} borderRadius={10} width={300}>
      <Column p={2}>
        {
          formComponents.map(component => (
            <Text>{component.data.type}</Text>
          ))
        }
        {components.isVisible && (
          <Row flexWrap="wrap">
            {components.items.map((option) => (
              <Chip
                key={option.data.name}
                icon={<Add />}
                label={option.data.name}
                sx={{ ml: 1, mb: 1 }}
                onClick={() => formEditor.component.set(option.data)}
              />
            ))}
          </Row>
        )}
      </Column>
    </Column>
  );
};
