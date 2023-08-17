import { useRole } from "@modules/studies/hooks";
import { Box, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface OnlyAdminProps {
  children: (options: { disabled: boolean }) => JSX.Element;
}

export const OnlyAdmin: React.FC<OnlyAdminProps> = ({ children: render }) => {
  const { t } = useTranslation();
  const role = useRole();

  const disabled = !role.isAdmin;

  return disabled ? (
    <Tooltip title={t("admin only")}>
      <Box>{render({ disabled })}</Box>
    </Tooltip>
  ) : (
    <Box>{render({ disabled })}</Box>
  );
};
