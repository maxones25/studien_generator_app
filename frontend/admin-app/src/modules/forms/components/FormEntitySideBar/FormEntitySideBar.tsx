import { Column, IconButton, Row, Text } from "@modules/core/components";
import { useMenuAnchor } from "@modules/core/hooks";
import { useGetEntities } from "@modules/entities/hooks";
import { Entity } from "@modules/entities/types";
import { FormEntityList } from "@modules/formEntities/components";
import { useAddEntity } from "@modules/formEntities/hooks";
import { Add } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface FormEntitySideBarProps {}

export const FormEntitySideBar: React.FC<FormEntitySideBarProps> = () => {
  const { t } = useTranslation();
  const createFormEntity = useAddEntity();
  const menuAnchor = useMenuAnchor();
  const getEntities = useGetEntities();

  const handleCreateFormEntity = (entity: Entity) => () => {
    createFormEntity.mutate({
      entityId: entity.id,
      name: entity.name,
    });
    menuAnchor.close();
  };

  return (
    <Column height="100%">
      <Row p={2} justifyContent="space-between">
        <Text>{t("entities")}</Text>
        <IconButton
          testId="close form component form"
          Icon={<Add />}
          onClick={menuAnchor.open}
        />
        <Menu
          anchorEl={menuAnchor.element}
          open={menuAnchor.isOpen}
          onClose={menuAnchor.close}
        >
          {getEntities.data?.map((entity) => (
            <MenuItem key={entity.id} onClick={handleCreateFormEntity(entity)}>
              {entity.name}
            </MenuItem>
          ))}
        </Menu>
      </Row>
      <Divider />
      <Column pl={1} pr={1} sx={{ overflowY: "scroll" }}>
        <FormEntityList />
      </Column>
    </Column>
  );
};
