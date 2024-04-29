import { useTranslation } from "react-i18next";

export const mapRecords = (data: Record<string, any>) => {
  const {t} = useTranslation();
  return {
    originalScheduledAt: data.originalScheduledAt,
    scheduledAt: data.scheduledAt,
    completedAt: data.completedAt,
    createdAt: data.scheduledAt ? undefined : data.createdAt,
    postpone: data.schedule?.postpone,
    rescheduled: data.schedule ? (data.rescheduled ?? '0') : undefined,
    restrict: data.schedule?.restrict,
    fields: data.fields ? t('values') : undefined,
    data: arrayToObject(data.fields),
  }
}

export const arrayToObject = (array: Record<string,any>[]): { [key: string]: any } => {
  return array?.reduce((obj, item, index) => {
    const suffix = obj[item?.entityField?.name] ? `_${index}` : '';
    obj[item?.entityField?.name + suffix] = item?.value;
    return obj;
  }, {} as { [key: string]: any });
};