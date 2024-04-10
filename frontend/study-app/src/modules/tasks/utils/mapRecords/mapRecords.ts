import { useTranslation } from "react-i18next";

export const mapRecords = (data: Record<string, any>) => {
  const {t} = useTranslation();
  return {
    originalScheduledAt: data.originalScheduledAt,
    scheduledAt: data.scheduledAt,
    completedAt: data.completedAt,
    createdAt: data.scheduledAt ? undefined : data.createdAt,
    postpone: data.schedule?.postpone,
    restrict: data.schedule?.restrict,
    fields: data.fields ? t('values') : undefined,
    ...arrayToObject(data.fields),
  }
}

const arrayToObject = (array: Record<string,any>[]): { [key: string]: any } => {
  return array?.reduce((obj, item) => {
    obj[item?.entityField?.name] = item?.value;
    return obj;
  }, {} as { [key: string]: any });
};