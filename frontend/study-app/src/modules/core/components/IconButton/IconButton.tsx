import React from "react";
import {
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
  Tooltip,
} from "@mui/material";

export interface IconButtonProps extends MIconButtonProps {
  Icon: JSX.Element;
  testId: string;
  tooltipProps?: {
    title: string;
  };
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  testId,
  tooltipProps,
  ...props
}) => {
  return tooltipProps ? (
    <Tooltip title={tooltipProps.title}>
      <span>
        <MIconButton data-testid={testId} {...props}>
          {Icon}
        </MIconButton>
      </span>
    </Tooltip>
  ) : (
    <MIconButton data-testid={testId} {...props}>
      {Icon}
    </MIconButton>
  );
};
