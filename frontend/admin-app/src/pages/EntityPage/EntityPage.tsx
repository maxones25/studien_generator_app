import { Page, Text } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { useGetEntity } from "@modules/entities/hooks";
import { FieldsTabPanel } from "@modules/fields/components";
import { useEntityId, useTab } from "@modules/navigation/hooks";
import { Tab, Tabs, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EntityPageProps {}

const EntityPage: React.FC<EntityPageProps> = () => {
  const { t } = useTranslation();
  const entityId = useEntityId();
  const tab = useTab();
  const navigate = useNavigationHelper();
  const getEntity = useGetEntity();

  return (
    <Page testId="entity page" ml={1} flex={1}>
      <Toolbar>
        <Text variant="h6">{getEntity.data?.name}</Text>
      </Toolbar>
      <Tabs
        onChange={(_, value) => navigate.to(`../${entityId}/${value}`)}
        value={tab}
        sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
      >
        <Tab label={t("fields")} value="fields" />
        <Tab label={t("requests")} value="requests" />
        <Tab label={t("form")} value="form" />
      </Tabs>
      {tab === "fields" ? <FieldsTabPanel /> : null}
    </Page>
  );
};

export default EntityPage;
