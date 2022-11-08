export interface UsersModal {
  id: number;
  title: string;
  name: string;
  email: string;
}

export enum UserTitle {
  SUPERADMIN = 1,
  ADMIN = 2,
  USER = 3,
}
