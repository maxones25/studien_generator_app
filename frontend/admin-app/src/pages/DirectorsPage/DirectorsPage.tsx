import { useAccessTokenContext } from "@modules/auth/contexts";
import {
  Column,
  DataList,
  DeleteDialog,
  IconButton,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { DirectorForm, ResetPasswordForm } from "@modules/directors/components";
import {
  useDeleteDirector,
  useGetDirectors,
  useResetPassword,
  useRestoreDirector,
  useUpdateDirector,
} from "@modules/directors/hooks";
import { Director, UpdateDirectorData } from "@modules/directors/types";
import {
  Delete,
  Edit,
  Logout,
  Password,
  RestoreFromTrash,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface DirectorsPageProps {}

const DirectorsPage: React.FC<DirectorsPageProps> = () => {
  const { t } = useTranslation();
  const getDirectors = useGetDirectors();
  const deleteDirector = useDeleteDirector();
  const updateDirector = useUpdateDirector();
  const resetPassword = useResetPassword();
  const restoreDirector = useRestoreDirector();
  const accessToken = useAccessTokenContext();
  const deleteData = useFormData<Director>();
  const updatePasswordData = useFormData<Director>();
  const updateData = useFormData<UpdateDirectorData>();

  return (
    <Page testId="directors page" alignItems="center">
      <Column mt={6} width="500px">
        <Row mb={3} justifyContent="space-between">
          <Text variant="h5">{t("admin")}</Text>
          <IconButton
            testId="logout admin"
            Icon={<Logout />}
            onClick={accessToken.reset}
          />
        </Row>
        <Column>
          <Text variant="h6" sx={{ ml: 2, mt: 1, mb: 1 }}>
            {t("directors")}
          </Text>
          <Divider />
          <DataList
            client={getDirectors}
            errorText=""
            noDataText=""
            disablePadding
            renderItem={(director) => (
              <ListItem
                key={director.id}
                divider
                disablePadding
                secondaryAction={
                  <Row>
                    {director.deletedAt !== null ? (
                      <IconButton
                        testId="restore director"
                        Icon={<RestoreFromTrash />}
                        onClick={() => restoreDirector.mutate(director)}
                        tooltipProps={{
                          title: t("restore record", { record: t("director") }),
                        }}
                      />
                    ) : (
                      <>
                        <IconButton
                          testId="open edit password dialog"
                          Icon={<Password />}
                          onClick={updatePasswordData.handleSet(director)}
                          tooltipProps={{
                            title: t("change value", { value: t("password") }),
                          }}
                        />
                        <IconButton
                          testId="open edit dialog"
                          Icon={<Edit />}
                          onClick={updateData.handleSet(director)}
                          tooltipProps={{
                            title: t("change value", { value: t("director") }),
                          }}
                        />
                        <IconButton
                          testId="open delete dialog"
                          Icon={<Delete />}
                          onClick={deleteData.handleSet(director)}
                          tooltipProps={{
                            title: t("delete record", {
                              record: t("director"),
                            }),
                          }}
                        />
                      </>
                    )}
                  </Row>
                }
              >
                <ListItemButton disabled={director.deletedAt !== null}>
                  <ListItemText
                    primary={director.firstName + " " + director.lastName}
                    secondary={director.email}
                  />
                </ListItemButton>
              </ListItem>
            )}
          />
        </Column>
      </Column>
      <Dialog
        open={updateData.hasData}
        onClose={updateData.reset}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <DirectorForm
            values={updateData.data}
            onSubmit={(data) => {
              updateDirector.mutateAsync(data).then(() => {
                updateData.reset();
              });
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={updatePasswordData.hasData}
        onClose={updatePasswordData.reset}
      >
        <DialogContent>
          <ResetPasswordForm
            onSubmit={(password) => {
              resetPassword
                .mutateAsync({ director: updatePasswordData.data!, password })
                .then(() => {
                  updatePasswordData.reset();
                });
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={updateData.hasData}
        onClose={updateData.reset}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <DirectorForm
            values={updateData.data}
            onSubmit={(data) => {
              updateDirector.mutateAsync(data).then(() => {
                updateData.reset();
              });
            }}
          />
        </DialogContent>
      </Dialog>
      <DeleteDialog
        record="director"
        target={deleteData.data?.email ?? ""}
        onCancel={deleteData.reset}
        onConfirm={({ hardDelete }) => {
          deleteDirector
            .mutateAsync({ director: deleteData.data!, hardDelete })
            .then(() => {
              deleteData.reset();
            });
        }}
        open={deleteData.hasData}
        hasSoftDelete
      />
    </Page>
  );
};

export default DirectorsPage;
