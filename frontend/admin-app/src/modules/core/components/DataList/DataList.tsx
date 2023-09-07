import {
  SearchFields,
  UseReadRequestResult,
  useSearchFilter,
} from "@modules/core/hooks";
import { Column, ColumnProps, Text } from "..";
import { CircularProgress, List, ListProps } from "@mui/material";

export interface DataListProps<Data extends Record<string, any>>
  extends ColumnProps {
  client: UseReadRequestResult<Data[]>;
  errorText: string;
  noDataText: string;
  items?: Data[];
  searchFields?: SearchFields<Data>;
  searchValue?: string;
  filter?: (item: Data) => boolean;
  renderItem: (
    item: Data,
    options: { i: number; arr: Data[]; isLast: boolean }
  ) => JSX.Element;
  disablePadding?: boolean;

  listProps?: ListProps;

  testId?: string;
}

export function DataList<Data extends Record<string, any>>({
  testId,
  client,
  errorText,
  noDataText,
  searchFields,
  searchValue,
  listProps,
  disablePadding = false,
  filter,
  renderItem,
  ...props
}: DataListProps<Data>) {
  const { isLoading, isError, data } = client;

  const hasData = (data?.length ?? 0) > 0;

  const filteredItems = useSearchFilter(data, searchValue, searchFields);

  const items = filter ? filteredItems.filter(filter) : filteredItems;

  return (
    <Column
      alignItems="center"
      position="relative"
      overflowY="hidden"
      {...props}
    >
      {isLoading ? (
        <CircularProgress data-testid="loading spinner" />
      ) : isError ? (
        <Text data-testid="error-text" color="error.main">
          {errorText}
        </Text>
      ) : !hasData ? (
        <Text>{noDataText}</Text>
      ) : (
        <List
          {...listProps}
          sx={{ width: "100%", overflowY: "scroll", ...listProps?.sx }}
          disablePadding={disablePadding}
          data-testid={testId}
        >
          {items.map((item, i, arr) =>
            renderItem(item, { i, arr, isLast: i === arr.length - 1 })
          )}
        </List>
      )}
    </Column>
  );
}
