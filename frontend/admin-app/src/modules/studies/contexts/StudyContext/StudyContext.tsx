import { UseReadRequestResult } from "@modules/core/hooks";
import { useGetStudy } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { createContext, FC, ReactNode, useContext } from "react";

type StudyContextValue = UseReadRequestResult<Study>;

interface StudyProviderProps {
  children: ReactNode;
}

const StudyContext = createContext<StudyContextValue | undefined>(undefined);

const useStudyContextValue = () => {
  const getStudy = useGetStudy();

  return getStudy;
};

export const StudyProvider: FC<StudyProviderProps> = ({ children }) => {
  const value = useStudyContextValue();

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
};

export const useStudyContext = () => {
  const context = useContext(StudyContext);

  if (!context) throw new Error("StudyContext must be inside a StudyProvider");

  return context;
};
