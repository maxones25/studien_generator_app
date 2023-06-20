import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { useQueryParams } from "@modules/core/hooks";
import React from "react";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const params = useQueryParams();
  const login = useLogin();

  const participantId = params.get("participantId") ?? "";
  const password = params.get("password") ?? "";

  return (
    <LoginForm
      onSubmit={login.mutate}
      values={{ id: participantId, password }}
    />
  );
};

export default LoginPage;
