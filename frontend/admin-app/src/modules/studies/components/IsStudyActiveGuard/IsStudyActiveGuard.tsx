import { useStudy } from "@modules/studies/contexts";
import { Box, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface IsStudyActiveGuardProps {
  children: (isActive: boolean) => JSX.Element;
}

export const IsStudyActiveGuard: React.FC<IsStudyActiveGuardProps> = ({
  children: render,
}) => {
  const { t } = useTranslation();
  const study = useStudy();

  return study.isActive ? (
    render(study.isActive)
  ) : (
    <Tooltip title={t("study must be active")}>
      <Box>{render(study.isActive)}</Box>
    </Tooltip>
  );
};
