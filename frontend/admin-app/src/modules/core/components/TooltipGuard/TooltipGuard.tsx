import { Box, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface TooltipGuardProps {
  validate: Record<string, boolean>;
  children: (disabled: boolean) => JSX.Element;
}

export const TooltipGuard: React.FC<TooltipGuardProps> = ({
  children: render,
  validate,
}) => {
  const { t } = useTranslation();

  const errorMessage = useMemo(
    () => Object.keys(validate).find((key) => validate[key]),
    [validate]
  );

  const disabled = Boolean(errorMessage);

  return disabled ? (
    <Tooltip title={t(errorMessage as string)}>
      <Box>{render(disabled)}</Box>
    </Tooltip>
  ) : (
    render(disabled)
  );
};
