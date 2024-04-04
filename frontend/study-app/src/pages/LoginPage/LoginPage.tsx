import { InstallationInfoDialog, LoginForm } from "@modules/auth/components";
import { useLogin } from "@modules/auth/hooks";
import { Button, Column, Page } from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { isInstallable } from "@modules/core/utils";
import { useId, usePassword } from "@modules/navigation/hooks";
import { Dialog } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const showInstallationGuide = isInstallable();
  const { isOpen: isOpenGuide, close: closeGuide, open: openGuide } = useOpen(showInstallationGuide);
  const { isOpen: isOpenForgotPassword, close: closeForgotPassword, open: openForgotPassword } = useOpen(false);
  const { t } = useTranslation();

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
        <Column gap={"2em"}>
          <LoginForm
            onSubmit={login.mutate}
            isError={login.isError}
            isLoading={login.isLoading}
            values={{ loginId, password }}
          />
          <Button testId="" fullWidth variant="outlined" onClick={openForgotPassword}>
            {t('forgot-password')}
          </Button>
          <Dialog open={isOpenForgotPassword} onClose={closeForgotPassword}>
          </Dialog>
          <Button testId="" fullWidth variant="outlined" onClick={openGuide}>
            {t('install-guide')}
          </Button>
          <InstallationInfoDialog open={isOpenGuide} onClose={closeGuide}>
          </InstallationInfoDialog>
        </Column>
    </Page>
  );
};

export default LoginPage;
