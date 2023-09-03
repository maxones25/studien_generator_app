import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import {
  Column,
  IconButton,
  Page,
  Row,
  Text,
  Link,
} from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { AdminPanelSettings } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const { t } = useTranslation();
  const login = useLogin();
  const navigate = useNavigationHelper();

  return (
    <Page testId="login page" alignItems="center">
      <Column p={1} mt={6}>
        <Text variant="h6" align="center">
          {t("login")}
        </Text>
        <LoginForm
          onSubmit={login.mutate}
          isError={login.isError}
          isLoading={login.isLoading}
        />
        <Link data-testid="signup-link" to="/signUp" sx={{ mt: 2 }}>
          {t("sign up link")}
        </Link>
        <Row justifyContent="center" mt={2}>
          <IconButton
            testId="open admin page"
            Icon={<AdminPanelSettings />}
            tooltipProps={{ title: t("admin") }}
            onClick={navigate.handle("/admin/login")}
          />
        </Row>
      </Column>
    </Page>
  );
};

export default LoginPage;
