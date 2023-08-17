import { useStudyContext } from "@modules/studies/contexts";

export interface UseRoleResult {
  isAdmin: boolean;
}

export const useRole = (): UseRoleResult => {
  const study = useStudyContext();

  const isAdmin = study.data?.role === "admin";

  return {
    isAdmin,
  };
};
