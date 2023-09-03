export type Director = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string;
  firstName: string;
  lastName: string;
  email: string;
};
export type UpdateDirectorData = Pick<Director, "id" | "email" | "firstName" | "lastName">