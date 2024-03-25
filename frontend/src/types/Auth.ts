export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthYear?: number;
  gender?: "Male" | "Female";
  is2FA: boolean;
}

export interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  emailFor2Factor: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterLecturerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface RegisterPayload extends RegisterLecturerPayload {
  birthYear: number;
  gender: "Male" | "Female";
}
export enum CodeTypes {
  RESET_PW = "RESET_PW",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  TWO_FA = "2FA",
}
export interface VerificationCodePayload {
  code: string;
  type: CodeTypes;
  email: string;
}
