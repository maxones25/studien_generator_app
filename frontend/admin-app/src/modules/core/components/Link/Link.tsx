import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import React from "react";
import { Link as RouterLink, To } from "react-router-dom";

export interface LinkProps extends MLinkProps {
  to: To;
  testId: string;
  children: JSX.Element | string;
}

export const Link: React.FC<LinkProps> = ({
  testId,
  children,
  sx,
  ...props
}) => {
  return (
    <MLink
      data-testid={testId}
      component={RouterLink}
      {...props}
      sx={{ textDecoration: "none", ...sx }}
    >
      {children}
    </MLink>
  );
};
