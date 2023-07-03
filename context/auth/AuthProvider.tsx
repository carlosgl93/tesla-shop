import React, { FC, useEffect, useReducer } from "react";
import { AuthReducer } from "./authReducer";
import { IUser, RegisterUserResponse } from "../../interfaces";
import { AuthContext } from "./";
import { teslaApi } from "../../api";
import Cookies from "js-cookie";
import axios from "axios";

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser | undefined;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

  useEffect(() => {}, []);

  const checkToken = async () => {
    try {
      const { data } = await teslaApi.get("/user/validate-token");

      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await teslaApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
    dispatch({ type: "Auth - Logout" });
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterUserResponse> => {
    try {
      const { data } = await teslaApi.post("/user/register", {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "User couldnt be created",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        logoutUser,
        registerUser,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
