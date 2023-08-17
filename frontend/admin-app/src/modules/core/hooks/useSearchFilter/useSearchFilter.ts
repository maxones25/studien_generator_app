import { useMemo } from "react";

export interface UseSearchFilterOptions {}

export type UseSearchFilterResult<DataItem extends Record<string, any>> =
  DataItem[];

type SearchField<DataItem> = DataItem extends Array<any>
  ? never
  : DataItem extends object
  ? {
      [K in keyof DataItem]: K extends string
        ? K | `${K}.${SearchField<DataItem[K]>}`
        : never;
    }[keyof DataItem]
  : never;

export type SearchFields<DataItem extends Record<string, any>> =
  SearchField<DataItem>[];

const matchField = (
  item: Record<string, any>,
  field: string,
  searchValue: string
) => {
  const chunks = field.split(".");
  let obj = item;
  for (const key of chunks) {
    if (obj[key] && typeof obj[key] === "object") {
      obj = obj[key];
    } else if (obj[key]) {
      if (obj[key].toString().toLowerCase().includes(searchValue)) return true;
    }
  }
  return false;
};

export const useSearchFilter = <DataItem extends Record<string, any>>(
  items: DataItem[] | undefined,
  searchValue: string | undefined,
  fields: SearchFields<DataItem> = []
): UseSearchFilterResult<DataItem> => {
  return useMemo<DataItem[]>(() => {
    if (!items) return [];
    if (!fields) return items;
    if (!searchValue) return items;
    return items.filter((item) =>
      fields.some((field) => matchField(item, field, searchValue.toLowerCase()))
    );
  }, [items, fields, searchValue]);
};
