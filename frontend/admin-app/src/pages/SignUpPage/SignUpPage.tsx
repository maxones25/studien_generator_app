import { SignUpForm } from "@modules/auth/components";
import { useSignUp } from "@modules/auth/hooks";
import { SignUpFormData } from "@modules/auth/types";
import { Column, Page, Text, Link } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import React from "react";
import { useTranslation } from "react-i18next";

export interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const signUp = useSignUp();
  const { t } = useTranslation();
  const navigate = useNavigationHelper();

  const handleSignUp = (data: SignUpFormData) => {
    signUp.mutateAsync(data).then(() => {
      navigate.to("/login");
    });
  };

  return (
    <Page testId="sign up page" alignItems="center">
      <Column p={1} mt={6}>
        <Text variant="h6" align="center">
          {t("sign up heading")}
        </Text>
        <SignUpForm
          onSubmit={handleSignUp}
          isError={signUp.isError}
          isLoading={signUp.isLoading}
        />
        <Link testId="login-link" to="/login" sx={{ mt: 2 }}>
          {t("login link")}
        </Link>
      </Column>
    </Page>
  );
};

export default SignUpPage;
