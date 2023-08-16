import { forwardRef } from "react";
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

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ Icon, testId, tooltipProps, ...props }, ref) => {
    return tooltipProps ? (
      <Tooltip title={tooltipProps.title}>
        <span>
          <MIconButton data-testid={testId} {...props}>
            {Icon}
          </MIconButton>
        </span>
      </Tooltip>
    ) : (
      <MIconButton ref={ref} data-testid={testId} {...props}>
        {Icon}
      </MIconButton>
    );
  }
);
