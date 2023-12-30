import { LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { Page } from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { isInstallable } from "@modules/core/utils";
import { useId, usePassword } from "@modules/navigation/hooks";
import { Dialog } from "@mui/material";
import React from "react";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const showInstallationGuide = isInstallable();
  const { isOpen, close } = useOpen(true);

  const loginId = useId();
  const password = usePassword();
  const login = useLogin();

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
          values={{ loginId, password }}
        />
        <Dialog open={isOpen && showInstallationGuide} onClose={close}>
        </Dialog>
    </Page>
  );
};

export default LoginPage;
