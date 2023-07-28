import {
  Column,
  DataList,
  IconButton,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import {
  useAddFormPage,
  useGetFormPages,
  useRemoveFormPage,
} from "@modules/formPages/hooks";
import { Add, Close, Delete } from "@mui/icons-material";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Theme,
} from "@mui/material";
import React, { useState } from "react";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { usePageNumber } from "@modules/navigation/hooks";
import { useTranslation } from "react-i18next";
import { FormPage } from "@modules/formPages/types";
import { useGetFormEntities } from "@modules/formEntities/hooks";
import { useGetComponents } from "@modules/components/hooks";
import { Component } from "@modules/components/types";
import { FormComponent } from "@modules/formComponents/types";
import { FormEntityField } from "@modules/formEntities/types";
import { FormComponentForm } from "@modules/formComponents/components";

export interface FormPageProps {}

const FormPage: React.FC<FormPageProps> = () => {
  const formComponent = useFormData<FormComponent>();
  const [selectedFields, setSelectedFields] = useState<
    (FormEntityField & { entityId: string })[]
  >([]);
  const { t } = useTranslation();
  const getFormPages = useGetFormPages();
  const getFormEntities = useGetFormEntities();
  const addFormPage = useAddFormPage();
  const removeFormPage = useRemoveFormPage();
  const navigate = useNavigationHelper();
  const pageNumber = usePageNumber();
  const getComponents = useGetComponents();

  const handleAddFormPage = () => {
    addFormPage.mutate({});
  };

  const handleRemoveFormPage = (page: FormPage) => () => {
    removeFormPage.mutate(page);
  };

  const options = getComponents.data?.filter((component) => {
    if (component.entityFields.length !== selectedFields.length) return false;
    const store: string[] = [];
    for (const fieldType of component.entityFields) {
      const selectedField = selectedFields.find(
        (sf) => sf.type === fieldType && !store.includes(sf.id)
      );
      if (selectedField) {
        store.push(selectedField.id);
      }
    }
    return store.length === component.entityFields.length;
  });

  const handleCreateComponent = (component: Component) => () => {
    formComponent.set({
      type: component.name,
      attributes: component.attributes.map(({ name }) => ({
        key: name,
        value: undefined,
      })),
      formFields: selectedFields.map(({ id, entityId }) => ({
        fieldId: id,
        entityId,
      })),
    });
  };

  return (
    <Page testId="form page" flex={1}>
      <Row p={2} pb={0}>
        {getFormPages.data?.map((page, i, arr) => {
          const isSelected = pageNumber === page.number;
          const isLast = arr.length - 1 === i;
          return (
            <Chip
              key={page.id}
              variant="filled"
              label={t("page x", { number: page.number })}
              color={isSelected ? "primary" : "default"}
              sx={{ mr: isLast ? 0 : 1 }}
              size="medium"
              onClick={navigate.handle(`../pages/${page.number}`)}
              onDelete={isSelected ? handleRemoveFormPage(page) : undefined}
              deleteIcon={isSelected ? <Delete /> : undefined}
            />
          );
        })}
        <IconButton
          testId="add form page button"
          Icon={<Add />}
          onClick={handleAddFormPage}
        />
      </Row>
      <Row flex={1} p={2} alignItems="stretch">
        <Column height="100%" boxShadow={4} borderRadius={10} width={300}>
          <Column p={2}>
            {(options?.length ?? 0) > 0 && (
              <Row>
                {options?.map((option) => (
                  <Chip
                    key={option.name}
                    icon={<Add />}
                    label={option.name}
                    sx={{ ml: 1 }}
                    onClick={handleCreateComponent(option)}
                  />
                ))}
              </Row>
            )}
          </Column>
        </Column>
        {formComponent.hasData ? (
          <Column height="100%" flex={1} boxShadow={4} ml={2}>
            <Row p={2} justifyContent="space-between">
              <Text>Form Component</Text>
              <IconButton
                testId="close form component form"
                Icon={<Close />}
                onClick={formComponent.reset}
              />
            </Row>
            <FormComponentForm
              values={formComponent.data}
              onSubmit={console.log}
            />
            <Divider />
          </Column>
        ) : (
          <Column height="100%" flex={1} boxShadow={4} ml={2}>
            <Row p={2}>
              <Text>{t("entities")}</Text>
            </Row>
            <Divider />
            <Column pl={1} pr={1}>
              <DataList
                client={getFormEntities}
                errorText="error"
                noDataText="no data"
                disablePadding
                renderItem={(formEntity) => (
                  <Column key={formEntity.id}>
                    <ListItem>
                      <ListItemText
                        primary={formEntity.name}
                        secondary={formEntity.entity.name}
                      />
                    </ListItem>
                    <List component="div" disablePadding>
                      {formEntity.fields.map((field) => {
                        const components = getComponents.data?.filter(
                          (component) =>
                            component.entityFields.some(
                              (type) => field.type === type
                            )
                        );
                        const selectedStyle = selectedFields.some(
                          (sf) => sf.id === field.id
                        )
                          ? {
                              outlineWidth: 2,
                              outlineStyle: "solid",
                              outlineColor: (theme: Theme) =>
                                theme.palette.primary.main,
                            }
                          : {};
                        return (
                          <ListItemButton
                            key={field.id}
                            sx={{
                              pl: 4,
                              borderRadius: 4,
                              boxShadow: 4,
                              mb: 1,
                              ...selectedStyle,
                            }}
                            onClick={() => {
                              if (
                                selectedFields.some((sf) => sf.id === field.id)
                              ) {
                                setSelectedFields(
                                  selectedFields.filter(
                                    (sf) => sf.id !== field.id
                                  )
                                );
                              } else {
                                setSelectedFields([
                                  ...selectedFields,
                                  { ...field, entityId: formEntity.id },
                                ]);
                              }
                            }}
                          >
                            <ListItemText
                              primary={field.name}
                              secondary={field.type}
                            />
                            {components?.map((component) => (
                              <Chip
                                key={component.name}
                                color="primary"
                                label={component.name}
                                sx={{ ml: 1 }}
                              />
                            ))}
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Column>
                )}
              />
            </Column>
          </Column>
        )}
      </Row>
    </Page>
  );
};

export default FormPage;
