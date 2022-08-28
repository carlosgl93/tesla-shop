import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  userLogin: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  checkToken: () => Promise<void>;
}
export const AuthContext = createContext({} as ContextProps);
