import { createContext } from "react";
import { IUser, RegisterUserResponse } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  registerUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<RegisterUserResponse>;
}
export const AuthContext = createContext({} as ContextProps);
