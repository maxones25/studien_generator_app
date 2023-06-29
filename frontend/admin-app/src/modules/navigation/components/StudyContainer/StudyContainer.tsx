import { Box, LinearProgress, Toolbar } from "@mui/material";
import React from "react";
import { StudyDrawer } from "..";
import { useGetStudy } from "@modules/studies/hooks";
import { Column } from "@modules/core/components";

export interface StudyContainerProps {
  children: JSX.Element;
}

export const StudyContainer: React.FC<StudyContainerProps> = ({ children }) => {
  const getStudy = useGetStudy();

  return getStudy.isLoading ? (
    <LinearProgress />
  ) : (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="stretch"
      justifyContent="space-between"
    >
      <StudyDrawer title={getStudy.data?.name} />
      <Column flex={1} m={1}>
        <Toolbar/>
        {children}
      </Column>
    </Box>
  );
};
