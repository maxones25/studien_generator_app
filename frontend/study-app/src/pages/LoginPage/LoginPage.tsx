import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { Page } from "@modules/core/components";
import { useId, usePassword } from "@modules/navigation/hooks";
import React from "react";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const id = useId();
  const password = usePassword();
  const login = useLogin();

  console.log({ id, password })

  return (
    <Page 
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }} 
      testId="login page">
      <LoginForm
        onSubmit={login.mutate}
        isError={login.isError}
        isLoading={login.isLoading}
        values={{ id, password }}
      />
    </Page>
  );
};

export default LoginPage;
