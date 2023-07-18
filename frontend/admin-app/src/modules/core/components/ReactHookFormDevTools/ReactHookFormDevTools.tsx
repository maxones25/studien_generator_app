import React from "react";
import { DevTool } from "@hookform/devtools";
import { useFormContext } from "react-hook-form";

const { DEV } = import.meta.env;

export interface ReactHookFormDevToolsProps {}

export const ReactHookFormDevTools: React.FC<
  ReactHookFormDevToolsProps
> = () => {
  const form = useFormContext();
  return DEV ? <DevTool control={form.control} /> : null;
};
