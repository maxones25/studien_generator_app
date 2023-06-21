import { Page, Text } from "@modules/core/components";
import React from "react";
import { Outlet } from "react-router-dom";

import { useTranslation } from "react-i18next";

export interface HelloWorldPageProps {}

const HelloWorldPage: React.FC<HelloWorldPageProps> = () => {
  const { t } = useTranslation();

  return (
    <Page testId="home page">
      <Text>{t("test")}</Text>
      <Outlet />
    </Page>
  );
};

export default HelloWorldPage;
