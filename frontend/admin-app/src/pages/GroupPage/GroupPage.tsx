import { Button, Column, Page, Row, Text } from "@modules/core/components";
import { useGetGroup } from "@modules/groups/hooks";
import { Divider, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupPageProps {}

const GroupPage: React.FC<GroupPageProps> = () => {
  const { t } = useTranslation()
  const getGroup = useGetGroup();

  console.log(getGroup.data);
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
        </Column>
    </Page>
  );
};

export default GroupPage;
