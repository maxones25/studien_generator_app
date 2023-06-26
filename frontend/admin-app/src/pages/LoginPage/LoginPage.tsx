import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { Column, Page, Text } from "@modules/core/components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const { t } = useTranslation("login");
  const login = useLogin();

  return (
    <Page testId="login page" alignItems="center">
      <Column p={1} mt={6}>
        <Text variant="h6" align="center">Studien Generator App</Text>
        <LoginForm
          onSubmit={login.mutate}
          isError={login.isError}
          isLoading={login.isLoading}
        />
        <Link to="/signUp">{t("sign up link")}</Link>
      </Column>
    </Page>
  );
};

export default LoginPage;
