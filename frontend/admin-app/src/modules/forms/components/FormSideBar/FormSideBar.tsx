import { Column, IconButton, Row, Text } from "@modules/core/components";
import { FormComponentForm } from "@modules/formComponents/components";
import { useFormEditor } from "@modules/forms/hooks";
import { Close } from "@mui/icons-material";
import React from "react";
import { FormEntitySideBar } from "..";

export interface FormSideBarProps {}

export const FormSideBar: React.FC<FormSideBarProps> = () => {
  const formEditor = useFormEditor();

  return (
    <Column
      height="100%"
      flex={1}
      boxShadow={4}
      ml={2}
      position="relative"
      sx={{ overflowY: "hidden" }}
    >
      {formEditor.component.isSelected ? (
        <>
          <Row p={2} justifyContent="space-between">
            <Text>Form Component</Text>
            <IconButton
              testId="close form component form"
              Icon={<Close />}
              onClick={formEditor.component.clear}
            />
          </Row>
          <FormComponentForm
            component={formEditor.component.data!}
            onSubmit={console.log}
            formProps={{ p: 1 }}
          />
        </>
      ) : (
        <FormEntitySideBar />
      )}
    </Column>
  );
};
