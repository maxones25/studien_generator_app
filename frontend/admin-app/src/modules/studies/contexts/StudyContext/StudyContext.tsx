import { UseReadRequestResult } from "@modules/core/hooks";
import { useGetStudy } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { LinearProgress } from "@mui/material";
import { createContext, FC, ReactNode, useContext } from "react";

type StudyContextValue = UseReadRequestResult<Study>;

interface StudyProviderProps {
  children: ReactNode;
}

const StudyContext = createContext<StudyContextValue | undefined>(undefined);

export const StudyProvider: FC<StudyProviderProps> = ({ children }) => {
  const query = useGetStudy();

  if (query.isLoading) {
    return <LinearProgress />;
  }

  if (query.isError) {
    return <h1>Error</h1>;
  }

  return (
    <StudyContext.Provider value={query}>{children}</StudyContext.Provider>
  );
};

export const useStudyQuery = () => {
  const context = useContext(StudyContext);

  if (!context) throw new Error("StudyContext must be inside a StudyProvider");

  return context;
};

export const useStudy = () => {
  const query = useStudyQuery();

  return query.data!;
};
