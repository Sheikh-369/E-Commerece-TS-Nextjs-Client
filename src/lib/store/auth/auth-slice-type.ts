import { Status } from "@/lib/global-type/type";

export interface IUserData {
  id: string;
  email: string;
  name?: string;
  userEmail?: string;
  userName?: string;
  userPassword?: string;
  userPhoneNumber?: string;
  token?: string;
  OTP?: string;
  newPassword?: string;
  avatar_url?: string;
}

export interface IAuthFormData {
  userEmail: string;
  userName?: string;
  userPassword?: string;
  userPhoneNumber?: string;
  OTP?: string;
  newPassword?: string;
}

export interface IAuthResponse extends Partial<IUserData> {
  token: string;
}

export interface IUserSliceState {
  user: IUserData | null;
  isLoaded: boolean; // NEW
  loginStatus: Status;
  registerStatus: Status;
  forgotPasswordStatus: Status;
  resetPasswordStatus: Status;
}
