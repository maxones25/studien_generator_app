import { Link } from "@modules/core/components";
import { formatDate, formatDateTime } from "@modules/date/utils";
import { FieldType } from "@modules/fields/types";
import { Record } from "@modules/records/types";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { get } from "react-hook-form";

export type TableColumn = {
  id: string;
  name: string;
  type: FieldType;
  ref?: {
    name: string;
    id: string;
  };
};
import { useTranslation } from "react-i18next";

export interface RecordsTableProps {
  columns: TableColumn[];
  data: Record[];
}

const getValueLabel = (value: any, column: TableColumn) => {
  return column.type === "Text" ? (
    value
  ) : column.type === "Number" ? (
    value
  ) : column.type === "Date" ? (
    formatDate(value)
  ) : column.type === "DateTime" ? (
    formatDateTime(value)
  ) : column.type === "Time" ? (
    value
  ) : column.type === "Boolean" ? (
    value ? (
      <CheckBox />
    ) : (
      <CheckBoxOutlineBlank />
    )
  ) : null;
};

export const RecordsTable: React.FC<RecordsTableProps> = ({
  columns,
  data,
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer data-testid="records table">
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell key={column.id}>{t(column.name)}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((record) => (
            <TableRow key={record.id}>
              {columns.map((column) => {
                const value = get(record, column.id);
                const isRef = Boolean(column.ref);
                return (
                  <TableCell key={column.id}>
                    {isRef ? (
                      <Link
                        testId="open entity"
                        to={`../${column.ref?.name}/${get(
                          record,
                          column.ref?.id
                        )}`}
                      >
                        {getValueLabel(value, column)}
                      </Link>
                    ) : (
                      getValueLabel(value, column)
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
