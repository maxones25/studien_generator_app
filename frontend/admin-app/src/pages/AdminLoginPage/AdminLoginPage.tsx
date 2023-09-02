import { AdminLoginForm } from "@modules/auth/components";
import { useLoginAdmin } from "@modules/auth/hooks";
import { Column, Page, Text } from "@modules/core/components";
import React from "react";

export interface AdminLoginPageProps {}

const AdminLoginPage: React.FC<AdminLoginPageProps> = () => {
  const loginAdmin = useLoginAdmin();
  return (
    <Page testId="admin login page" alignItems="center">
      <Column p={1} mt={6}>
        <Text variant="h6" align="center">
          Admin Login
        </Text>
        <AdminLoginForm onSubmit={loginAdmin.mutate} />
      </Column>
    </Page>
  );
};

export default AdminLoginPage;
