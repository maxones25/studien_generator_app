import { useMemo } from "react";

export interface UseSearchFilterOptions {}

export type UseSearchFilterResult<DataItem extends Record<string, any>> =
  DataItem[];

export type SearchFields<DataItem extends Record<string, any>> =
  (keyof DataItem)[];

export const useSearchFilter = <DataItem extends Record<string, any>>(
  items: DataItem[] | undefined,
  searchValue: string | undefined,
  fields: SearchFields<DataItem> = []
): UseSearchFilterResult<DataItem> => {
  return useMemo<DataItem[]>(() => {
    if (!items) return [];
    if (!fields) return items;
    if (!searchValue) return items;
    const lcValue = searchValue.toLowerCase();
    return items.filter((item) =>
      fields.some((field) =>
        item[field].toString().toLowerCase().includes(lcValue)
      )
    );
  }, [items, fields, searchValue]);
};
