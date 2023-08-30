import { Column, ColumnProps, Row, TestDnD } from "@modules/core/components";
import {
  useGetComponents,
  useRemoveComponent,
} from "@modules/formComponents/hooks";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { ComponentPreview } from "..";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { FormComponent } from "@modules/formComponents/types";
import { ComponentList } from "@modules/formComponents/components";

export interface FormPreviewProps {}

export const FormPreview: React.FC<FormPreviewProps> = () => {
  const formEditor = useFormEditor();
  const { components } = useFormEditorContext();
  const removeComponent = useRemoveComponent();
  const getFormComponents = useGetComponents();

  if (getFormComponents.isLoading) {
    return null;
  }

  if (getFormComponents.isError) throw new Error();

  const formComponents = getFormComponents.data!;

  return (
    <Column height="100%" boxShadow={4} borderRadius={10} width={320}>
      <Column p={2} pt={4} pb={4} pr={1} overflowY="scroll">
        {formComponents.map((formComponent) => (
          <ComponentPreview
            key={formComponent.id}
            component={formComponent}
            onSelect={formEditor.formComponent.set}
            onDelete={removeComponent.mutate}
          />
        ))}
        {formEditor.component.isVisible && (
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
