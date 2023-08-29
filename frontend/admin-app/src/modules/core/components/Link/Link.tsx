import { Link as MLink, LinkProps as MLinkProps } from "@mui/material";
import React from "react";
import { Link as RouterLink, To } from "react-router-dom";

export interface LinkProps extends MLinkProps {
  to: To;
  children: JSX.Element | string;
}

export const Link: React.FC<LinkProps> = ({ children, sx, ...props }) => {
  return (
    <MLink component={RouterLink} {...props} sx={{ textDecoration: "none", ...sx }}>
      {children}
    </MLink>
  );
};
