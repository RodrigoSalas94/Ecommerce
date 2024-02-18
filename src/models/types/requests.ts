export type UserData = {
  idusers: number;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  rolename: string; // "ADMIN" "USER"
};

export type UserRegister = Pick<
  UserData,
  "email" | "password"  | "name" | "rolename"
>;
