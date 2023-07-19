import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { Page } from "@modules/core/components";
import React from "react";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const login = useLogin();

  return (
    <Page testId="login page">
      <LoginForm
        onSubmit={login.mutate}
        isError={login.isError}
        isLoading={login.isLoading}
      />
    </Page>
  );
};

export default LoginPage;
