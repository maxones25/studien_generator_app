import {
  Form,
  FormSelect,
  Row,
  IconButton,
  OnlyAdmin,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { Director, MemberFormData } from "@modules/members/types";
import { Add } from "@mui/icons-material";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface InviteMemberFormProps extends FormProps<MemberFormData> {
  directors: Director[];
}

export const InviteMemberForm: React.FC<InviteMemberFormProps> = ({
  onSubmit,
  values,
  formProps,
  directors,
}) => {
  const { t } = useTranslation();
  const form = useForm<MemberFormData>({
    values,
  });

  const handleSubmit = (data: MemberFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form
      {...formProps}
      form={form}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onSubmit={handleSubmit}
    >
      <FormControl margin="normal" sx={{ flex: 1 }}>
        <Autocomplete
          disablePortal
          noOptionsText={t("no directors found")}
          onChange={(_, director) => {
            form.setValue("directorId", director?.id ?? "");
          }}
          getOptionLabel={({ firstName, lastName }) =>
            `${firstName} ${lastName}`
          }
          filterOptions={(options, { inputValue, getOptionLabel }) => {
            const searchValue = inputValue.toLowerCase();
            return options.filter((director) => {
              if (director.email.toLowerCase().includes(searchValue))
                return true;
              if (getOptionLabel(director).toLowerCase().includes(searchValue))
                return true;
              return false;
            });
          }}
          options={directors}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                size="small"
                placeholder={t("search directors")}
              />
            );
          }}
        />
        <input
          type="hidden"
          {...form.register("directorId", { required: "required" })}
        />
      </FormControl>
      <Row>
        <FormSelect
          control={form.control}
          sx={{ ml: 1, minWidth: 150 }}
          size="small"
          name="role"
          options={[
            {
              label: t("member"),
              value: "employee",
            },
            {
              label: t("admin"),
              value: "admin",
            },
          ]}
        />
        <FormControl margin="normal" sx={{ ml: 1 }}>
          <OnlyAdmin>
            {({ disabled }) => (
              <IconButton
                type="submit"
                color="success"
                testId="submit invite member"
                disabled={disabled}
                Icon={<Add />}
              />
            )}
          </OnlyAdmin>
        </FormControl>
      </Row>
    </Form>
  );
};
