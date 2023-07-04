import React, { FC, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import Cookies from "js-cookie";
import { teslaApi } from "../../api";
import { AuthContext, AuthReducer } from "./";
import { IUser, RegisterUserResponse } from "../../interfaces";

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

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "Auth - Login", payload: data?.user as IUser });
    }
  }, [data, status]);

  const checkToken = async () => {
    const cookieToken = Cookies.get("token");

    if (!cookieToken) return;

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
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");
    signOut();
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
