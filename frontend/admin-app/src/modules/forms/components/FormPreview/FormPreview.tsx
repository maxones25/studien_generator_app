import { Column, Row, Text } from "@modules/core/components";
import { useGetFormComponents } from "@modules/formComponents/hooks";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";

export interface FormPreviewProps {}

export const FormPreview: React.FC<FormPreviewProps> = () => {
  const formEditor = useFormEditor();
  const { components } = useFormEditorContext();
  const getFormComponents = useGetFormComponents();

  return (
    <Column height="100%" boxShadow={4} borderRadius={10} width={300}>
      <Column p={2}>
        {getFormComponents.data?.map((formComponent) => (
          <Row key={formComponent.id} boxShadow={4} p={1} borderRadius={4} mt={1}>
            <Text>{formComponent.type}</Text>
          </Row>
        ))}
        {components.isVisible && (
          <Row flexWrap="wrap" mt={2}>
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
