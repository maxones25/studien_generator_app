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
  ({ Icon, testId, tooltipProps, disabled, ...props }, ref) => {
    return tooltipProps && !disabled ? (
      <Tooltip title={tooltipProps.title}>
        <MIconButton data-testid={testId} disabled={disabled} {...props}>
          {Icon}
        </MIconButton>
      </Tooltip>
    ) : ( 
      <MIconButton
        ref={ref}
        data-testid={testId}
        disabled={disabled}
        {...props}
      >
        {Icon}
      </MIconButton>
    );
  }
);
