import {
  Button,
  Column,
  DataList,
  DataListItem,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useGetGroup, useGetGroupForms } from "@modules/groups/hooks";
import {
  Checkbox,
  Divider,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupPageProps {}

const GroupPage: React.FC<GroupPageProps> = () => {
  const { t } = useTranslation();
  const getGroup = useGetGroup();
  const getGroupForms = useGetGroupForms();

  return (
    <Page testId="group page" ml={1} flex={1}>
      <Toolbar>
        <Text variant="h6">{getGroup.data?.name}</Text>
      </Toolbar>
      <Column mt={1}>
        <Row m={2} mt={1} justifyContent="space-between">
          <Text>{t("forms")}</Text>
        </Row>
        <Divider />
        <DataList
          client={getGroupForms}
          errorText="error"
          noDataText="no data"
          renderItem={(item) => (
            <DataListItem key={item.id} item={item}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.isActive}
                />
              </ListItemIcon>
              <ListItemText>{item.form.name}</ListItemText>
            </DataListItem>
          )}
        />
      </Column>
    </Page>
  );
};

export default GroupPage;
