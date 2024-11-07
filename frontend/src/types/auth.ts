export type Email = string;
export type Password = string;
export type ConfirmPassword = string;

export interface UserInfo {
  id: string;
  email: string;
  profileSetup: boolean;
  firstName?: string;
  lastName?: string;
  color?: number;
  image?: string | null;
}
export interface AuthStore {
  userinfo: UserInfo | null;
  setUserinfo: (userinfo: UserInfo | null) => void;
}
