import { AdminLoginForm } from "@modules/auth/components";
import { useLoginAdmin } from "@modules/auth/hooks";
import { Column, Link, Page, Text } from "@modules/core/components";
import React from "react";
import { useTranslation } from "react-i18next";
export interface AdminLoginPageProps {}

const AdminLoginPage: React.FC<AdminLoginPageProps> = () => {
  const { t } = useTranslation();
  const loginAdmin = useLoginAdmin();
  return (
    <Page testId="admin login page" alignItems="center">
      <Column p={1} mt={6}>
        <Text variant="h6" align="center">
          Admin Login
        </Text>
        <AdminLoginForm onSubmit={loginAdmin.mutate} />
        <Link to={"/login"} sx={{ mt: 2 }}>{t("login link")}</Link>
      </Column>
    </Page>
  ); 
};

export default AdminLoginPage;
