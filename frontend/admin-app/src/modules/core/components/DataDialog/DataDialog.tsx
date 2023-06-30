import { UseFormDataResult, FormData } from "@modules/core/hooks";
import { Dialog } from "@mui/material";
import { Column, Text } from "..";
import { FormProps } from "@modules/core/types";

export interface DataDialogProps<TData extends FormData> {
  client: UseFormDataResult<TData>;
  Form: React.FC<FormProps<TData>>;
  mode?: "upsert" | "delete";
  onCreate?: (data: TData) => Promise<any>;
  onUpdate?: (data: TData) => Promise<any>;
  onDelete?: (data: TData) => Promise<any>;
  createTitle?: string;
  updateTitle?: string;
  deleteTitle?: string;
}

export function DataDialog<TData extends FormData>({
  client,
  Form,
  createTitle,
  updateTitle,
  deleteTitle,
  onCreate,
  onUpdate,
  onDelete,
  mode = "upsert",
}: DataDialogProps<TData>) {
  const handleSave = (data: TData) => {
    if (data.id) {
      if (mode === "upsert" && onUpdate) {
        onUpdate(data).then(() => {
          client.reset();
        });
      } else if (mode === "delete" && onDelete) {
        onDelete(data).then(() => {
          client.reset();
        });
      }
      client.reset();
    } else if (onCreate) {
      onCreate(data).then(() => {
        client.reset();
      });
    }
  };

  const title =
    mode === "upsert"
      ? client.isNew
        ? createTitle
        : updateTitle
      : mode === "delete"
      ? deleteTitle
      : undefined;

      console.log(client)

  return (
    <Dialog open={client.hasData} onClose={client.reset}>
      <Column p={2}>
        <Text color="text.secondary">{title}</Text>
        <Form
          formProps={{
            p: 0,
          }}
          onSubmit={handleSave}
          values={client.data}
        />
      </Column>
    </Dialog>
  );
}
