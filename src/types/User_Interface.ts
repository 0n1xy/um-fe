export interface IUser {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  isAdmin: number;
  password?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  dateOfBirth?: string;
  password?: string;
}
