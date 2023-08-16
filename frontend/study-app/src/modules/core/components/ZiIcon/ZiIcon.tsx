import React from 'react';
import { ReactComponent as Icon } from "../../../../assets/logo.svg";
import { SvgIcon, SvgIconProps } from '@mui/material';

export interface ZiIconProps extends SvgIconProps {}

export const ZiIcon : React.FC<ZiIconProps>= props => {
  return (
    <SvgIcon {...props}>
      <Icon />
    </SvgIcon>
  );
};