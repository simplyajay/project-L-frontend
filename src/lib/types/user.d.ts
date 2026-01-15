export type User = {
  _id: string;
  username: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  nickname?: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};
