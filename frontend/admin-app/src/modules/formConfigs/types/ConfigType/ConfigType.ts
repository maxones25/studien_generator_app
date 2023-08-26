export const ConfigType = {
  TimeDependent: "TimeDependent",
  TimeIndependent: "TimeIndependent",
} as const;

export type ConfigTypeType = (typeof ConfigType)[keyof typeof ConfigType];
