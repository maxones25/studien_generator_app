import { Column, Row } from "@modules/core/components";
import { useGetComponents } from "@modules/formComponents/hooks";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { ComponentPreview } from "..";

export interface FormPreviewProps {}

export const FormPreview: React.FC<FormPreviewProps> = () => {
  const formEditor = useFormEditor();
  const { components } = useFormEditorContext();
  const getFormComponents = useGetComponents();

  return (
    <Column height="100%" boxShadow={4} borderRadius={10} width={300}>
      <Column p={2} pt={4} pb={4} overflowY="scroll">
        {getFormComponents.data?.map((formComponent) => (
          <ComponentPreview key={formComponent.id} component={formComponent} />
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
