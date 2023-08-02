import { useMemo, useState } from "react";

export interface UseListSelectorOptions<Data extends Record<string, any>> {
  items: Data[];
  multiple?: boolean;
  selector?: (selection: string[], item: Data) => boolean;
}

export interface UseListSelectorResult<Data extends Record<string, any>> {
  items: {
    data: Data;
    isSelected: boolean;
  }[];
  add: (value: string) => void;
  remove: (value: string) => void;
  clear: () => void;
}

const filterSelection = (selection: string[], value: string) => {
  return selection.filter((s) => s !== value);
};

export const useListSelector = <Data extends Record<string, any>>({
  items,
  multiple = false,
  selector = (selection, item) => selection.includes(item["id"]),
}: UseListSelectorOptions<Data>): UseListSelectorResult<Data> => {
  const [selection, setSelection] = useState<string[]>([]);

  const add = (value: string) => {
    if (multiple && selection.length > 0) {
      setSelection([...selection, value]);
    } else {
      setSelection([...filterSelection(selection, value), value]);
    }
  };

  const remove = (value: string) => {
    setSelection(filterSelection(selection, value));
  };

  const clear = () => {
    setSelection([]);
  };

  const selectedItems = useMemo(() => {
    return items.map((item) => {
      const isSelected = selector(selection, item);
      return {
        data: item,
        isSelected,
      };
    });
  }, [items, selection]);

  return {
    items: selectedItems,
    add,
    remove,
    clear,
  };
};
