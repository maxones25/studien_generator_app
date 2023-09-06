import { Column, IconButton, Row, Text } from "@modules/core/components";
import { FormComponentForm } from "@modules/formComponents/components";
import { useFormEditor } from "@modules/forms/hooks";
import { Close } from "@mui/icons-material";
import React from "react";
import { FormEntitySideBar } from "..";
import { FormComponentFormData } from "@modules/formComponents/types";
import { useAddComponent } from "@modules/formComponents/hooks";
import { useFormEditorContext } from "@modules/forms/contexts";

export interface FormSideBarProps {}

export const FormSideBar: React.FC<FormSideBarProps> = () => {
  const formEditor = useFormEditor();
  const { state } = useFormEditorContext();
  const createFormComponent = useAddComponent();

  const handleSave = ({ attributes }: FormComponentFormData) => {
    createFormComponent
      .mutateAsync({
        attributes,
        type: state.component.data!.name,
        formFields: state.fields.map(({ entity, data }) => ({
          entityId: entity.id,
          fieldId: data.id,
        })),
      })
      .then(() => {
        formEditor.component.clear();
        formEditor.selected.fields.clear();
      });
  };

  const hasFields = (state?.fields?.length ?? 0) > 0;

  const hasMultipleFields = (state?.fields?.length ?? 0) > 1;

  const fieldName =
    hasMultipleFields || !hasFields
      ? state.component.data?.name
      : state?.fields[0].data.name;

  return (
    <Column
      height="100%"
      flex={1}
      boxShadow={4}
      ml={2}
      position="relative"
      overflowY="hidden"
    >
      {formEditor.component.isSelected ? (
        <>
          <Row p={2} justifyContent="space-between">
            <Text>{fieldName}</Text>
            <IconButton
              testId="close form component form"
              Icon={<Close />}
              onClick={formEditor.component.clear}
            />
          </Row>
          <FormComponentForm
            componentAttributes={formEditor.component.data?.attributes!}
            fieldName={fieldName}
            onSubmit={handleSave}
            formProps={{ p: 1, overflowY: "scroll" }}
          />
        </>
      ) : (
        <FormEntitySideBar />
      )}
    </Column>
  );
};
