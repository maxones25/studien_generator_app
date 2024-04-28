import { Column, DataListItem, Row } from "@modules/core/components";
import {
  useGetComponents,
  useRemoveComponent,
  useUpdateComponentSequence,
} from "@modules/formComponents/hooks";
import { useFormEditorContext } from "@modules/forms/contexts";
import { useFormEditor } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { ComponentPreview } from "..";
import { useTranslation } from "react-i18next";
import { ComponentList } from "@modules/formComponents/components";
import { FormComponent } from "@modules/formComponents/types";

export interface FormPreviewProps {}

export const FormPreview: React.FC<FormPreviewProps> = () => {
  const {t} = useTranslation()
  const formEditor = useFormEditor();
  const { components } = useFormEditorContext();
  const removeComponent = useRemoveComponent();
  const getFormComponents = useGetComponents();
  const updateComponentSequence = useUpdateComponentSequence();

  if (getFormComponents.isLoading) {
    return null;
  }

  if (getFormComponents.isError) throw new Error();

  const formComponents = getFormComponents.data!;

  const saveSequence = (data: FormComponent[]) => {
    updateComponentSequence.mutate({components: data});
  }

  const onUpdate = (formComponent: FormComponent) => {
    formEditor.formComponent.reset();
    formEditor.formComponent.set(formComponent)
  } 

  return (
    <Column height="100%" boxShadow={4} borderRadius={10} width={320}>
      <Column p={2} pt={4} pb={4} pr={1} overflowY="scroll">
        <ComponentList
          data={formComponents}
          saveSequence={saveSequence}
          renderItem={(item) => (
            <DataListItem
              key={item.id}
              item={item}
              onDelete={removeComponent.mutate}
              onUpdate={onUpdate}
            >
              <ComponentPreview
                key={item.id}
                component={item}
                />
            </DataListItem>
          )}
        />
        {formEditor.component.isVisible && (
          <Row flexWrap="wrap" mt={2}>
            {components.items.map((option) => (
              <Chip
                key={option.data.name}
                icon={<Add />}
                label={t(option.data.name)}
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
