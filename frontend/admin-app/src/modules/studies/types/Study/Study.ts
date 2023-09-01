export type Study = {
  id: string;
  name: string;
  role: string;
  director: {
    role: string;
    displayName: string;
  }
  deletedAt: string | null;
  isActive: boolean;
  duration: number | null;
  startDate: string | null;
  endDate: string | null;
};
