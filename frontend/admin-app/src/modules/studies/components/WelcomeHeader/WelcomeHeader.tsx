import { useAccessTokenContext } from "@modules/auth/contexts";
import { IconButton, Row, Text } from "@modules/core/components";
import { useGetMe } from "@modules/directors/hooks";
import { Logout } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface WelcomeHeaderProps {}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = () => {
  const getMe = useGetMe();
  const accessToken = useAccessTokenContext();
  const { t } = useTranslation();

  return (
    <Row mb={6} justifyContent="space-between">
      <Text>
        {getMe.data &&
          t("hello") + " " + getMe.data?.firstName + " " + getMe.data?.lastName}
      </Text>
      <Row>
        <IconButton
          testId="logout director"
          Icon={<Logout />}
          tooltipProps={{ title: t("logout") }}
          onClick={accessToken.reset}
        />
      </Row>
    </Row>
  );
};
